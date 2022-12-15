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

const StyledEditButton = styled.button`
  border-radius: 5px;
  font-weight: 600;
  padding: 3px 9px;
  cursor: pointer;
  letter-spacing:0.25px;
  font-size: 14px;
`;

const Counter = ({ label, label_2, duration, duration_2, label2, label2_2, progress, progress_2, removeClick, desc, moveUp, moveDown, index, rounds, currentRoundVal }) => {

  const { timers, paused, reset, setEditMode, editMode, timerToEdit, setTimerToEdit, updateTimer, showTempDuration, setShowTempDuration, tempWorkoutDuration, setTempWorkoutDuration, tempRestDuration, setTempRestDuration, tempRounds, setTempRounds } = useContext(AppContext);
  const navigate = useNavigate();

  const InnerCounter = ({ label, duration, label2, progress, removeClick, moveUp, moveDown, index }) => {

    const restTimer = (label.indexOf("Rest") > -1) ? true : false;

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
              setTempRounds(timers[index].rounds);
            }
          }} />}
        </div>
        <div style={{ width: "170px",}}>
          <span style={{fontSize: "15px",}}>{label}:</span>
          <br></br>
          <div style={{display: "flex",}}>
            <StyledCounter>{((index === timerToEdit) && showTempDuration) ? restTimer ? translateFromSeconds(tempRestDuration) : translateFromSeconds(tempWorkoutDuration) : duration}</StyledCounter>
            {(editMode && (index === timerToEdit)) && <div style={{display:"flex", flexDirection: "column", paddingLeft: "10px",}}>
              <span style={{fontSize: "12px", cursor: "pointer",}} onClick={() => {
                if (restTimer) {
                  setTempRestDuration(c => c + 1);
                } else {
                  setTempWorkoutDuration(c => c + 1);
                }
                setShowTempDuration(true);
              }}>&#x25B2;</span>
              <span style={{fontSize: "12px", cursor: "pointer",}} onClick={() => {
                if (restTimer) {
                  tempRestDuration > 1 && setTempRestDuration(c => c - 1);
                } else {
                  tempWorkoutDuration > 1 && setTempWorkoutDuration(c => c - 1);
                }
                setShowTempDuration(true);
              }}>&#x25BC;</span>
            </div>}
          </div>
        </div>
        <div>
          <span style={{fontSize: "15px",}}>{label2}:</span>
          <br></br>
          <StyledCounter>{progress}</StyledCounter>
        </div>
        {((!label.includes('Rest')) && (timers.length > 1)) && <div style={{textAlign: "right", marginLeft: "auto", paddingRight: "20px",}}>
          <span style={{cursor: (!editMode && paused && index > 0) ? "pointer" : "not-allowed", opacity: (!editMode && paused && index > 0) ? 1 : 0.5,}} onClick={() => {
            if (!editMode && paused && index > 0) {
              moveUp();
            }
          }}>&#9651;</span>
          <br />
          <span style={{cursor: (!editMode && paused && (index < timers.length - 1)) ? "pointer" : "not-allowed", opacity: (!editMode && paused && (index < timers.length - 1)) ? 1 : 0.5,}} onClick={() => {
            if (!editMode && paused && (index < timers.length - 1)) {
              moveDown();
            }
          }}>&#9661;</span>
        </div>}
      </div>

    );
      
  };

  const Description = ({ desc }) => {

    const TempDescriptionInput = () => {
      return <input className="tempDesc" defaultValue={desc} />;
    };

    if (desc) {
      return <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> {(editMode && (index === timerToEdit)) ? <TempDescriptionInput /> : desc}</div>;
    } else if (editMode && (index === timerToEdit)) {
      return <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> <TempDescriptionInput /></div>
    }

  };

  return (
      <>
        <Description desc={desc} />
        <InnerCounter label={label} duration={duration} label2={label2} progress={progress} removeClick={removeClick} moveUp={moveUp} moveDown={moveDown} index={index} />
        {label_2 && <InnerCounter label={label_2} duration={duration_2} label2={label2_2} progress={progress_2} index={index} />}
        {rounds && 
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",}}>
          <div style={{ textAlign: "center",}}>Round: <b>{currentRoundVal}</b> of {((index === timerToEdit) && showTempDuration) ? tempRounds : rounds}</div>
          {(editMode && (index === timerToEdit)) && <div style={{display:"flex", flexDirection: "column", paddingLeft: "10px",}}>
            <span style={{fontSize: "10px", cursor: "pointer",}} onClick={() => {
              setTempRounds(c => c + 1);
              setShowTempDuration(true);
            }}>&#x25B2;</span>
            <span style={{fontSize: "10px", cursor: "pointer",}} onClick={() => {
              tempRounds > 1 && setTempRounds(c => c - 1);
              setShowTempDuration(true);
            }}>&#x25BC;</span>
          </div>}
        </div>
        }
        {(editMode && (index === timerToEdit)) && <div style={{display:"flex", gap: "5px", paddingLeft: "50px", paddingTop: rounds ? "20px" : "0",}}>
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