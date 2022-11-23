import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppProvider';
import Input from '../components/generic/Input';
import styled from 'styled-components';

const StyledDropdown = styled.select`
    font-size: 18px;
    padding: 5px;
    width: 200px;
    font-weight: 500;
`;

const CreateTimerView = () => {

    const defaultTimer = 'Choose Your Timer';

    const { createTimer } = useContext(AppContext);
    const [timerType, setTimerType] = useState(defaultTimer);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [input2Hours, setInput2Hours] = useState(0);
    const [input2Minutes, setInput2Minutes] = useState(0);
    const [input2Seconds, setInput2Seconds] = useState(0);
    const [inputRounds, setInputRounds] = useState(1);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        if (timerType === "Stopwatch" || timerType === "Countdown" || timerType === "Tabata") {
            setInputRounds(1);
        }
    }, [timerType]);

    useEffect(() => {
        if (confirmationMessage) {
            setTimeout(() => {
                setConfirmationMessage('');
            }, "2000")
        }
    }, [confirmationMessage]);

    const timers = [
        { timerType: "Stopwatch" },
        { timerType: "Countdown" },
        { timerType: "XY" },
        { timerType: "Tabata" },
    ];

    const makeInput = ({state, setter, label}) => {
        return <Input label={label} value={state} onChange={e => {
            e.target.value ? setter(parseInt(e.target.value)) : setter(0);
        }} />
    };

    const Dropdown = ({timers, timerType}) => {
        return (
            <div style={{ textAlign: "center", margin: "30px 0 20px",}}>
                <StyledDropdown id="timers" onChange={e => {setTimerType(e.target.value);}}>
                    <option value={timerType}>{timerType}</option>
                    {timers.map(timer => timerType !== timer.timerType && <option key={timer.timerType} value={timer.timerType}>{timer.timerType}</option>)}
                </StyledDropdown>
            </div>
        )
    };

    if (timerType === defaultTimer) {
        return (
            <>
                <Dropdown timers={timers} timerType={timerType} />
                {confirmationMessage && <div style={{ textAlign: "center", fontStyle: "italic", color: "green",}}>{confirmationMessage}</div>}
            </>
        )
    }

    return (
        <>
            <Dropdown timers={timers} timerType={timerType} />
            <div style={{ textAlign: "center",}}>
                <div style={{ margin: "0 0 10px",display: "flex", justifyContent: "center", alignItems: "center",}}>
                    <div style={{ width: "135px", textAlign: "right"}}>Set workout time:</div>
                    {makeInput({
                        state: inputHours, 
                        setter: setInputHours,
                        label: "H"
                    })}
                    {makeInput({
                        state: inputMinutes, 
                        setter: setInputMinutes,
                        label: "M"
                    })}
                    {makeInput({
                        state: inputSeconds, 
                        setter: setInputSeconds,
                        label: "S"
                    })}
                </div>
                {(timerType === "Tabata") && 
                    <div style={{ margin: "0 0 10px",display: "flex", justifyContent: "center", alignItems: "center",}}>
                        <div style={{ width: "135px", textAlign: "right"}}>Set rest time:</div>
                        {makeInput({
                            state: input2Hours, 
                            setter: setInput2Hours,
                            label: "H"
                        })}
                        {makeInput({
                            state: input2Minutes, 
                            setter: setInput2Minutes,
                            label: "M"
                        })}
                        {makeInput({
                            state: input2Seconds, 
                            setter: setInput2Seconds,
                            label: "S"
                        })}
                    </div>
                }
                {(timerType === "XY" || timerType === "Tabata") && 
                    <div style={{ margin: "0 0 10px",}}>Set number of rounds: 
                        {makeInput({
                            state: inputRounds,
                            setter: setInputRounds,
                            label: "R"
                        })}
                    </div>
                }
                <button onClick={() => {
                    createTimer({ timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds });
                    setTimerType(defaultTimer);
                    setInputHours(0);
                    setInputMinutes(0);
                    setInputSeconds(0);
                    setInput2Hours(0);
                    setInput2Minutes(0);
                    setInput2Seconds(0);
                    setInputRounds(1);
                    setConfirmationMessage(`${timerType} added to queue`);
                    }}
                >Add To Queue</button>
            </div>
        </>
    );

};

export default CreateTimerView;