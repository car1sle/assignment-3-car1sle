import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutRoundDur, restRoundDur, progress, status, rounds, desc } = props;
    const { timers, removeTimer, setIsComplete, currentRound, swapOrder } = useContext(AppContext);

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
            <Counter label="Workout time per round" duration={translateFromSeconds(workoutRoundDur)} label2="Your progress this round" progress={progressVal} removeClick={() => removeTimer(index)} desc={desc} moveUp={() => swapOrder(timers, index, index - 1)} moveDown={() => swapOrder(timers, index, index + 1)} index={index} label_2="Rest time per round" duration_2={translateFromSeconds(restRoundDur)} label2_2="Your progress this round" progress_2={progressVal2} />
            <div style={{ textAlign: "center", padding: "5px 0 0",}}>Round: <b>{currentRoundVal}</b> of {rounds}</div>
        </>

    );

};

export default XY;