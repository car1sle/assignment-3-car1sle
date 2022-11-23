import React from "react";
import { v4 as uuid } from "uuid";
import { useInterval, usePersistedState } from "./utils/hooks";
import { translateToSeconds } from "./utils/helpers";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = usePersistedState('timers', []);
    // console.log(JSON.stringify(timers));
    const [paused, setPaused] = usePersistedState('paused', true);
    const [activeIndex, setActiveIndex] = usePersistedState('activeIndex', 0);
    const [currentTime, setCurrentTime] = usePersistedState('currentTime', 0);
    const [isComplete, setIsComplete] = usePersistedState('isComplete', false);
    const [currentRound, setCurrentRound] = usePersistedState('currentRound', 1);
    const [onlyEnableStart, setOnlyEnableStart] = usePersistedState('onlyEnableStart', true);

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
            setOnlyEnableStart(true);
          },
          removeTimer: index => setTimers(timers.filter((t, i) => i !== index)),
        }}
      >
        {children}
      </AppContext.Provider>
    );

};