import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import trash from '../../images/trash.png';
import pencil from '../../images/pencil.png'
import { AppContext } from "../../AppProvider";
import '../../index.css';
import { translateFromSeconds } from "../../utils/helpers";

const StyledCounter = styled.div`
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 28px;
  letter-spacing: -0.75px;
  display: inline-block;
`;

const StyledLabel = styled.span`
  font-size: 15px;
`;

const StyledEditButton = styled.button`
  border-radius: 5px;
  font-weight: 600;
  padding: 3px 9px;
  cursor: pointer;
  letter-spacing:0.25px;
  font-size: 14px;
`;

const Counter = ({ label, label_2, duration, duration_2, label2, label2_2, progress, progress_2, removeClick, desc, moveUp, moveDown, index }) => {

  const { timers, paused, reset, setEditMode, editMode, timerToEdit, setTimerToEdit, updateTimer, showTempDuration, setShowTempDuration, tempWorkoutDuration, setTempWorkoutDuration, tempRestDuration, setTempRestDuration } = useContext(AppContext);
  const navigate = useNavigate();

  const InnerCounter = ({ label, duration, label2, progress, removeClick, moveUp, moveDown, index }) => {

    const restTimer = (label.indexOf("Rest") > -1) ? true : false;
    console.log(timerToEdit);
    console.log('tempWorkoutDuration:' + tempWorkoutDuration);
    console.log('tempRestDuration:' + tempRestDuration);

    return (

      <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 0 20px",}}>
        <div style={{ display:"flex", flexDirection:"column",width: "30px", justifyContent: "space-between", height:"55px",}}>
          {removeClick && <img alt="Delete" src={trash} style={{ width: "20px", height: "22px", cursor: paused ? "pointer" : "not-allowed", opacity: paused ? 1 : 0.5,}} onClick={() => {
            if (paused) {
              removeClick();
              reset();
              if (timers.length === 1) {
                navigate("/");
              }
            }
          }} />}
          {removeClick && <img alt="Edit" src={pencil} style={{ width: "20px", height: "22px", cursor: (paused && !editMode) ? "pointer" : "not-allowed", opacity: (paused && !editMode) ? 1 : 0.5,}} onClick={() => {
            if (paused && !editMode) {
              setTimerToEdit(index);
              setEditMode(true);
              setTempWorkoutDuration(timers[index].wRoundDur);
              setTempRestDuration(timers[index].rRoundDur);
            }
          }} />}
        </div>
        <div style={{ width: "170px",}}>
          <StyledLabel>{label}:</StyledLabel>
          <br></br>
          <div style={{display: "flex",}}>
            <StyledCounter>{((index === timerToEdit) && showTempDuration) ? restTimer ? translateFromSeconds(tempRestDuration) : translateFromSeconds(tempWorkoutDuration) : duration}</StyledCounter>
            {(editMode && (index === timerToEdit)) && <div style={{display:"flex", flexDirection: "column", paddingLeft: "10px",}}>
              <span style={{fontSize: "12px",}} onClick={() => {
                if (restTimer) {
                  setTempRestDuration(c => c + 1);
                } else {
                  setTempWorkoutDuration(c => c + 1);
                }
                setShowTempDuration(true);
              }}>&#x25B2;</span>
              <span style={{fontSize: "12px",}} onClick={() => {
                if (restTimer) {
                  setTempRestDuration(c => c - 1);
                } else {
                  setTempWorkoutDuration(c => c - 1);
                }
                setShowTempDuration(true);
              }}>&#x25BC;</span>
            </div>}
          </div>
        </div>
        <div>
          {label2}:
          <br></br>
          <StyledCounter>{progress}</StyledCounter>
        </div>
        {(!label.includes('Rest')) && <div style={{textAlign: "right", marginLeft: "auto", paddingRight: "20px",}}>
          <span style={{cursor: (!editMode && paused && index > 0) ? "pointer" : "not-allowed", opacity: (!editMode && paused && index > 0) ? 1 : 0.5,}} onClick={() => {moveUp();}}>&#x25B2;</span>
          <br />
          <span style={{cursor: (!editMode && paused && (index < timers.length - 1)) ? "pointer" : "not-allowed", opacity: (!editMode && paused && (index < timers.length - 1)) ? 1 : 0.5,}} onClick={() => {moveDown();}}>&#x25BC;</span>
        </div>}
      </div>

    );
      
  };

  return (
      <>
        {desc && <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> {desc}</div>}
        <InnerCounter label={label} duration={duration} label2={label2} progress={progress} removeClick={removeClick} moveUp={moveUp} moveDown={moveDown} index={index} />
        {label_2 && <InnerCounter label={label_2} duration={duration_2} label2={label2_2} progress={progress_2} index={index} />}
        {(editMode && (index === timerToEdit)) && <div style={{display:"flex", gap: "5px", paddingLeft: "50px",}}>
          <StyledEditButton value="Save" onClick={() => {updateTimer();}}>Save</StyledEditButton>
          <StyledEditButton value="Discard" onClick={() => {
            setEditMode(false);
            setShowTempDuration(false);
            reset();
          }}>Discard</StyledEditButton>
        </div>}
      </>
  );
};
  
  export default Counter;