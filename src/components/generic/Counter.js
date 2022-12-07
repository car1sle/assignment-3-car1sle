import React, { useContext, useState } from "react";
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

const Counter = ({ label, duration, label2, progress, removeClick, desc, moveUp, moveDown, index }) => {

  const { timers, paused, reset, setEditMode, editMode } = useContext(AppContext);
  const navigate = useNavigate();

  const [showTempDuration, setShowTempDuration] = useState(false);
  const [timerToEdit, setTimerToEdit] = useState(0);
  const [tempDuration, setTempDuration] = useState(timers[timerToEdit].wRoundDur);

  console.log(tempDuration);
  console.log(timerToEdit);

  return (
      <>
      {desc && <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> {desc}</div>}
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
              setEditMode(true);
              setTimerToEdit(index);
            }
          }} />}
        </div>
        <div style={{ width: "170px",}}>
          <StyledLabel>{label}:</StyledLabel>
          <br></br>
          <div style={{display: "flex",}}>
            <StyledCounter>{showTempDuration ? translateFromSeconds(tempDuration) : duration}</StyledCounter>
            {(editMode && (index === timerToEdit)) && <div style={{display:"flex", flexDirection: "column", paddingLeft: "10px",}}>
              <span style={{fontSize: "12px",}} onClick={() => {
                setTempDuration(c => c + 1);
                setShowTempDuration(true);
              }}>&#x25B2;</span>
              <span style={{fontSize: "12px",}} onClick={() => {
                setTempDuration(c => c - 1);
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
      {(editMode && (index === timerToEdit)) && <div style={{display:"flex", gap: "5px", paddingLeft: "50px",}}>
        <StyledEditButton value="Save" onClick={() => {
          // navigate(`/w/${encodeURI(encodeURI(JSON.stringify(timers)))}`);
        }}>Save
        </StyledEditButton>
        <StyledEditButton value="Discard" onClick={() => {
          setEditMode(false);
        }}>Discard</StyledEditButton>
      </div>}
      </>
  );
};
  
  export default Counter;