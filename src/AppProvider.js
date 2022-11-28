import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useInterval, usePersistedState } from "./utils/hooks";
import { translateToSeconds } from "./utils/helpers";
import { useParams, useNavigate } from 'react-router-dom';
import { PATHS } from "./constants";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  
    const navigate = useNavigate();
    const { path } = useParams();
    const timersFromUrl = path ? JSON.parse(path) : [];

    const [timers, setTimers] = usePersistedState('timers', timersFromUrl);
    const [paused, setPaused] = usePersistedState('paused', true);
    const [activeIndex, setActiveIndex] = usePersistedState('activeIndex', 0);
    const [currentTime, setCurrentTime] = usePersistedState('currentTime', 0);
    const [isComplete, setIsComplete] = usePersistedState('isComplete', false);
    const [currentRound, setCurrentRound] = usePersistedState('currentRound', 1);
    const [onlyEnableStart, setOnlyEnableStart] = usePersistedState('onlyEnableStart', false);
    console.log(timersFromUrl);
    console.log(timers);

    useEffect(() => {

      if (path && encodeURI(JSON.stringify(timers)) !== encodeURI(path)) {
        setTimers(timersFromUrl);
      }
      
    }, [timers, timersFromUrl]);

    useInterval(() => {
      if (paused || activeIndex >= timers.length) return;

      if (currentTime === timers[activeIndex].roundDuration) {
        setCurrentTime(0);
        setCurrentRound(r => {
          let newRound = r + 1;
          if (newRound > timers[activeIndex].inputRounds) {
            newRound = 1;
            setActiveIndex(activeIndex => activeIndex + 1);
          }
          return newRound;
        });
      } else {
        setCurrentTime(c => c + 1);
      }

    }, 1000);

    const reset = () => {
      setActiveIndex(0);
      setCurrentTime(0);
      setPaused(true);
      setIsComplete(false);
      setCurrentRound(1);
      setOnlyEnableStart(true);
    };

    const fastForward = () => {
      setActiveIndex(activeIndex + 1);
      setCurrentTime(0);
      setCurrentRound(timers[activeIndex].inputRounds);
      setOnlyEnableStart(false);
    };

    return (
      <AppContext.Provider
        value={{
          timers,
          setTimers,
          currentTime,
          currentRound,
          setCurrentTime,
          activeIndex,
          setActiveIndex,
          paused,
          setPaused,
          isComplete,
          setIsComplete,
          onlyEnableStart,
          setOnlyEnableStart,
          reset: reset,
          fastForward: fastForward,
          createTimer: ({ timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds = 1 }) => {
            const id = uuid();
            setTimers([...timers, { 
              id, 
              timerType, 
              inputRounds, 
              workoutRoundDuration: translateToSeconds(inputHours, inputMinutes, inputSeconds), 
              restRoundDuration: translateToSeconds(input2Hours, input2Minutes, input2Seconds), 
              roundDuration: translateToSeconds(inputHours, inputMinutes, inputSeconds) + translateToSeconds(input2Hours, input2Minutes, input2Seconds),
              totalWorkoutDuration: (translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds),
              totalRestDuration: (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds),
              totalDuration: ((translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds) + (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds)),
            }]);
            currentTime === 0 && setOnlyEnableStart(true);
            reset();
          },
          removeTimer: index => {
            const tempTimers = timers.filter((t, i) => i !== index);
            setTimers(tempTimers);
            navigate(PATHS.WORKOUT.VIEW(encodeURI(encodeURI(JSON.stringify(tempTimers)))));
          }
        }}
      >
        {children}
      </AppContext.Provider>
    );

};