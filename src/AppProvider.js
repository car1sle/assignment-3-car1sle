import React, { useEffect } from "react";
import { useInterval, usePersistedState } from "./utils/hooks";
import { translateToSeconds } from "./utils/helpers";
import { useParams, useNavigate } from 'react-router-dom';

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    function isJson(item) {
      item = typeof item !== "string"
          ? JSON.stringify(item)
          : item;

      try {
          item = JSON.parse(item);
      } catch (e) {
          return false;
      }

      if (typeof item === "object" && item !== null) {
          return true;
      }

      return false;
    }
  
    const short = require('short-uuid');
    const navigate = useNavigate();
    const { path } = useParams();
    const timersFromUrl = (path && isJson(path)) ? JSON.parse(path) : [];

    const [timers, setTimers] = usePersistedState('timers', timersFromUrl);
    const [paused, setPaused] = usePersistedState('paused', true);
    const [activeIndex, setActiveIndex] = usePersistedState('activeIndex', 0);
    const [currentTime, setCurrentTime] = usePersistedState('currentTime', 0);
    const [passedTime, setPassedTime] = usePersistedState('passedTime', 0);
    const [isComplete, setIsComplete] = usePersistedState('isComplete', false);
    const [currentRound, setCurrentRound] = usePersistedState('currentRound', 1);
    // const [completedWorkouts, setCompletedWorkouts] = usePersistedState('completedWorkouts', []);
    const [onlyEnableStart, setOnlyEnableStart] = usePersistedState('onlyEnableStart', false);
    console.log(timers);
    console.log(path);
    // console.log(completedWorkouts);
    // console.log(isComplete);

    useEffect(() => {

      if (path && isJson(path) && encodeURI(JSON.stringify(timers)) !== encodeURI(path)) {
        setTimers(timersFromUrl);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timers, timersFromUrl]);

    useInterval(() => {
      
      if (paused || activeIndex >= timers.length) return;

      if (currentTime === timers[activeIndex].roundDur) {
        setCurrentTime(0);
        setCurrentRound(r => {
          let newRound = r + 1;
          if (newRound > timers[activeIndex].rounds) {
            newRound = 1;
            setActiveIndex(activeIndex => activeIndex + 1);
          }
          return newRound;
        });
      } else {
        setCurrentTime(c => c + 1);
        setPassedTime(c => c + 1);
      }

    }, 925);

    const reset = () => {
      setActiveIndex(0);
      setCurrentTime(0);
      setPaused(true);
      setIsComplete(false);
      setCurrentRound(1);
      setOnlyEnableStart(true);
      setPassedTime(0);
    };

    const totalQueueDuration = timers.reduce((accumulator, object) => {
      return accumulator + object.totalDur;
    }, 0);

    const fastForward = () => {
      setActiveIndex(activeIndex + 1);
      setCurrentTime(0);
      setCurrentRound(timers[activeIndex].rounds);
      setOnlyEnableStart(false);
      if (activeIndex + 1 === timers.length) {
        setPassedTime(totalQueueDuration);
      } else if (currentRound === 1) {
        setPassedTime(passedTime + (timers[activeIndex].totalDur - currentTime));
      } else {
        const timeOfCompletedRounds = (currentRound - 1) * timers[activeIndex].roundDur;
        const passedTimeForThisTimer = timeOfCompletedRounds + currentTime;
        setPassedTime(passedTime + (timers[activeIndex].totalDur - passedTimeForThisTimer));
      }
    };

    return (
      <AppContext.Provider
        value={{
          timers,
          // completedWorkouts,
          setTimers,
          currentTime,
          passedTime,
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
          createTimer: ({ timerT, desc, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds = 1 }) => {
            const id = short.generate().slice(0,10);
            setTimers([...timers, { 
              id, 
              timerT, 
              desc,
              rounds: inputRounds, 
              wRoundDur: translateToSeconds(inputHours, inputMinutes, inputSeconds), 
              rRoundDur: translateToSeconds(input2Hours, input2Minutes, input2Seconds), 
              roundDur: translateToSeconds(inputHours, inputMinutes, inputSeconds) + translateToSeconds(input2Hours, input2Minutes, input2Seconds),
              // totalWorkoutDur: (translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds),
              // totalRestDur: (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds),
              totalDur: ((translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds) + (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds)),
            }]);
            currentTime === 0 && setOnlyEnableStart(true);
            reset();
          },
          removeTimer: index => {
            const tempTimers = timers.filter((t, i) => i !== index);
            setTimers(tempTimers);
            navigate(`/w/${encodeURI(encodeURI(JSON.stringify(tempTimers)))}`);
          },
          swapOrder: (arr, i1, i2) => {
            let temp = arr[i1];
            arr[i1] = arr[i2];
            arr[i2] = temp;
            setTimers(arr);
            navigate(`/w/${encodeURI(encodeURI(JSON.stringify(arr)))}`);
          }
        }}
      >
        {children}
      </AppContext.Provider>
    );

};