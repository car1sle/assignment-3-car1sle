import { useContext } from "react";
import { AppContext } from "../AppProvider";
import { translateFromSeconds } from "../utils/helpers";

const HistoryView = () => {

    const { completedWorkouts } = useContext(AppContext);

    const renderedCompletedWorkouts = completedWorkouts.map((workouts, index) => {
        return (
            <div key={index} style={{width: "350px", margin: "20px auto", }}>
                <span style={{fontWeight: "bold",}}>Workout #{index + 1}</span>
                <div style={{border: "1px solid #bfbfbf", margin: "10px 0 0",}}>
                    {workouts.map((timer, index2) => {
                        return <div style={{padding: "10px", textAlign: "left", borderTop: index2 > 0 && "1px solid #bfbfbf",}} key={index + timer.id}>
                            <span style={{textDecoration: "underline", }}>{timer.timerT}</span>
                            <ul style={{paddingLeft: "20px", margin: "10px 0",}}>
                                {timer.desc && <li style={{padding: "0 0 3px",}}>Description: {timer.desc}</li>}
                                <li style={{padding: "0 0 3px",}}>Rounds: {timer.rounds}</li>
                                <li style={{padding: "0 0 3px",}}>Duration per round: {translateFromSeconds(timer.roundDur)}</li>
                                    {(timer.rRoundDur > 0) && <ul style={{paddingLeft: "10px", margin: "5px 0",}}>
                                        <li style={{padding: "0 0 3px",}}>Workout duration per round: {translateFromSeconds(timer.wRoundDur)}</li>
                                        <li style={{padding: "0 0 3px",}}>Rest duration per round: {translateFromSeconds(timer.rRoundDur)}</li>
                                    </ul>}
                                <li style={{padding: "0 0 3px", fontWeight: "bold",}}>Total duration: {translateFromSeconds(timer.totalDur)}</li>
                            </ul>
                        </div>
                    })}
                </div>
            </div>
        );

    });

    return (
        <div style={{textAlign: "center", margin: "30px 0",}}>{renderedCompletedWorkouts}</div>
    );

};

export default HistoryView;