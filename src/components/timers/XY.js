import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutRoundDur, progress, status, rounds, desc } = props;
    const { timers, removeTimer, setIsComplete, currentRound } = useContext(AppContext);

    // I tried moving this to hooks.js to dry it up, but gave an error
    useEffect(() => {
        if (index + 1 === timers.length && status === 'Complete') {
          setIsComplete(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    let progressVal;
    let currentRoundVal;

    if (status === 'Current') {
        progressVal = translateFromSeconds(workoutRoundDur - progress);
        currentRoundVal = currentRound;
    } else {
        progressVal = status;
        if (status === 'Complete') {
            currentRoundVal = rounds;
        } else {
            currentRoundVal = 1;
        }
    }

    return (
        <>
            <Counter label="Total time per round" duration={translateFromSeconds(workoutRoundDur)} label2="Your progress this round" progress={progressVal} removeClick={() => removeTimer(index)} desc={desc} />
            <div style={{ textAlign: "center", padding: "5px 0 0",}}>Round: <b>{currentRoundVal}</b> of {rounds}</div>
        </>

    );

};

export default XY;