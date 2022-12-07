import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppProvider";
import { translateFromSeconds } from "../utils/helpers";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Timer = styled.div`
  border: 2px solid #2e2e2e;
  border-radius: 5px;
  margin: 8px;
  background: #ffffff;
`;

const TimerTitle = styled.div`
  font-size: 15px;
  font-style: italic;
  text-align: left;
  color: #ffffff;
  letter-spacing: 0.2px;
`;

const TimerDur = styled.div`
  font-size: 15px;
  font-style: italic;
  text-align: right;
  color: #ffffff;
  letter-spacing: 0.2px;
`;

const TimersView = () => {
  const { timers, currentTime, activeIndex, passedTime, totalQueueDur } = useContext(AppContext);

  const InnerTimer = ({type, props}) => {
    if (type === 'Stopwatch') {
      return <Stopwatch props={props} />
    } else if (type === 'Countdown') {
      return <Countdown props={props} />
    } else if (type === 'XY') {
      return <XY props={props} />
    } else if (type === 'Tabata') {
      return <Tabata props={props} />
    };
  };

  const totalRemaining = totalQueueDur - passedTime;

  return (
    <Timers>
      <div style={{ fontSize: "18px", padding: "0 0 10px",}}>Total workout time: <b>{translateFromSeconds(totalQueueDur)}</b></div>
      <div style={{ fontSize: "18px", padding: "0 0 10px",}}>Remaining time: <b>{translateFromSeconds(totalRemaining)}</b></div>
      {timers && timers.map((timer, index) => (
        <Timer key={timer.id}>
          <div style={{ display: "flex", backgroundColor: "#2e2e2e", padding:"7px", justifyContent: "space-between",}}>
            <TimerTitle>{timer.timerT}</TimerTitle>
            {(timer.timerT === 'XY' || timer.timerT === 'Tabata') && <TimerDur>Total time of all rounds: <b>{translateFromSeconds(timer.totalDur)}</b></TimerDur>}
          </div>
          <div style={{ width: "510px", padding: "15px 0 15px 20px",}}>
            <InnerTimer type={timer.timerT} props={{
              index: index,
              desc: timer.desc,
              workoutRoundDur: timer.wRoundDur,
              restRoundDur: timer.rRoundDur,
              roundDur: timer.roundDur,
              // totalWorkoutDur: timer.totalWorkoutDur,
              // totalRestDur: timer.totalRestDur,
              totalDur: timer.totalWorkoutDur,
              rounds: timer.rounds,
              progress: currentTime,
              status: index === activeIndex ? 'Current' : index > activeIndex ? 'Upcoming' : 'Complete',
            }} />
          </div>
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
