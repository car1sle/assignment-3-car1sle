import React, { useContext } from "react";
import { AppContext, AppProvider } from "../AppProvider";
import { Link } from "react-router-dom";
import { translateFromSeconds } from "../utils/helpers";

const HistoryViewInner = () => {

    const { timers, completedWorkouts } = useContext(AppContext);

    const StyledCount = ({count, label}) => {
        if (label === 'rest') {
            return <span>and <b>{translateFromSeconds(count)} {label}</b></span>
        }
        return <b>{translateFromSeconds(count)} {label}</b>
    };

    return (
        <>
            <div style={{ textDecoration: "underline",}}>Completed workouts</div>
            <ol>
                {completedWorkouts.map(workout => {
                    const short = require('short-uuid');
                    const id = short.generate().slice(0,10);
                    return <li style={{ marginBottom: "10px",}} key={id}>A {workout.rounds}-round {workout.timerT} with <StyledCount count={workout.wRoundDur} label="workout" /> {(workout.rRoundDur > 0) && <StyledCount count={workout.rRoundDur} label="rest" />} per round</li>
                })}
            </ol>
            <Link to={`/w/${encodeURI(encodeURI(JSON.stringify(timers)))}`}><div style={{ margin: "50px 0",}}>Back to workout</div></Link>
        </>
    );

};

const HistoryView = () => {

    return (
        <AppProvider>
            <div style={{ margin: "50px",}}>
            <HistoryViewInner />
            </div>
        </AppProvider>
    );

};

export default HistoryView;