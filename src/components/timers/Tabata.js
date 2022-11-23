import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutRoundDuration, restRoundDuration, progress, status, rounds, totalWorkoutDuration, totalRestDuration } = props;
    const { timers, removeTimer, setIsComplete, currentRound } = useContext(AppContext);

    // I tried moving this to hooks.js to dry it up, but gave an error
    useEffect(() => {
        if (index + 1 === timers.length && status === 'Complete') {
          setIsComplete(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    let progressVal;
    let progressVal2;
    let currentRoundVal;

    if (status === 'Current') {
        progressVal = (workoutRoundDuration - progress) > 0 ? translateFromSeconds(workoutRoundDuration - progress) : translateFromSeconds(0);
        progressVal2 = (workoutRoundDuration - progress) > 0 ? translateFromSeconds(restRoundDuration) : translateFromSeconds(restRoundDuration - (progress - workoutRoundDuration));
        currentRoundVal = currentRound;
    } else {
        progressVal = status;
        progressVal2 = status;
        if (status === 'Complete') {
            currentRoundVal = rounds;
        } else {
            currentRoundVal = 1;
        }
    }

    return (
        <>
            <Counter label="Workout time" duration={translateFromSeconds(totalWorkoutDuration)} progress={progressVal} removeClick={() => removeTimer(index)} />
            <Counter label="Rest time" duration={translateFromSeconds(totalRestDuration)} progress={progressVal2} />
            <div style={{ textAlign: "center", padding: "5px 0 0",}}>Round: <b>{currentRoundVal}</b> of {rounds}</div>
        </>

    );

};

export default XY;