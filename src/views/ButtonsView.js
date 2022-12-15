import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import { Button } from '../components/generic/Button';

const ButtonsView = () => {

    const { timers, currentTime, activeIndex, paused, setPaused, reset, fastForward, isComplete, onlyEnableStart, setOnlyEnableStart, editMode } = useContext(AppContext);

    const handleClick = value => {

        if (value === 'Start' || value === 'Pause' || value === 'Resume') {
            if (value === 'Start') {setOnlyEnableStart(false);}
            setPaused(!paused);
        } else if (value === 'Fast Forward') {
            fastForward();
        } else if (value === 'Reset') {
            reset();
        }
    };

    const makeButton = ({value, disabledValue}) => {
        return <Button value={value} disabledValue={(timers.length > 0 && !editMode) ? disabledValue : true} onClick={handleClick} />
    };

    if (timers.length === 0) {return};

    return (
        <div style={{ margin: "0 auto", width: "430px",}}>
            <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between",}}>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: isComplete || (paused && currentTime === 0 && activeIndex === 0) ? 'Start' : paused ? 'Resume' : 'Pause',
                        disabledValue: isComplete,
                    })}
                </div>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: "Fast Forward",
                        disabledValue: onlyEnableStart ? true : isComplete,
                    })}
                </div>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: "Reset", 
                        disabledValue: onlyEnableStart ? true : (!isComplete && !paused),
                    })}
                </div>
            </div>
        </div>
    );

};

export default ButtonsView;