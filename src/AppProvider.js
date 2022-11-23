import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useInterval, usePersistedState } from "./utils/hooks";
import { translateToSeconds } from "./utils/helpers";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = usePersistedState('timers', []);
    const [paused, setPaused] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);
    const [onlyEnableStart, setOnlyEnableStart] = useState(true);

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