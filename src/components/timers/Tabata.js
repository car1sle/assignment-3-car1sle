import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutRoundDur, restRoundDur, progress, status, rounds, totalWorkoutDur, totalRestDur } = props;
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
        progressVal = (workoutRoundDur - progress) > 0 ? translateFromSeconds(workoutRoundDur - progress) : translateFromSeconds(0);
        progressVal2 = (workoutRoundDur - progress) > 0 ? translateFromSeconds(restRoundDur) : translateFromSeconds(restRoundDur - (progress - workoutRoundDur));
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
            <Counter label="Workout time" duration={translateFromSeconds(totalWorkoutDur)} progress={progressVal} removeClick={() => removeTimer(index)} />
            <Counter label="Rest time" duration={translateFromSeconds(totalRestDur)} progress={progressVal2} />
            <div style={{ textAlign: "center", padding: "5px 0 0",}}>Round: <b>{currentRoundVal}</b> of {rounds}</div>
        </>

    );

};

export default XY;