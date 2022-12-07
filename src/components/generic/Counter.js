import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import trash from '../../images/trash.png';
import pencil from '../../images/pencil.png'
import { AppContext } from "../../AppProvider";

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

const Counter = ({ label, duration, label2, progress, removeClick, desc, moveUp, moveDown, index }) => {

  const { timers, paused, reset } = useContext(AppContext);
  const navigate = useNavigate();

  return (
      <>
      {desc && <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> {desc}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 0 20px",}}>
        <div style={{ display:"flex", flexDirection:"column",width: "30px",}}>
          <img alt="Delete" src={trash} style={{ width: "17px", height: "20px", cursor: paused ? "pointer" : "not-allowed", opacity: paused ? 1 : 0.5,}} onClick={() => {
            if (paused) {
              removeClick();
              reset();
              if (timers.length === 1) {
                navigate("/");
              }
            }
          }} />
          <img alt="Edit" src={pencil} style={{ width: "17px", cursor: paused ? "pointer" : "not-allowed", opacity: paused ? 1 : 0.5,}} onClick={() => {}} />
        </div>
        <div style={{ width: "170px",}}><StyledLabel>{label}:</StyledLabel><br></br><StyledCounter>{duration}</StyledCounter></div>
        <div>{label2}:<br></br><StyledCounter>{progress}</StyledCounter></div>
        {(!label.includes('Rest')) && <div style={{textAlign: "right", marginLeft: "auto", paddingRight: "20px",}}>
          <span style={{cursor: (paused && index > 0) ? "pointer" : "not-allowed", opacity: (paused && index > 0) ? 1 : 0.5,}} onClick={() => {moveUp();}}>&#x25B2;</span>
          <br />
          <span style={{cursor: (paused && (index < timers.length - 1)) ? "pointer" : "not-allowed", opacity: (paused && (index < timers.length - 1)) ? 1 : 0.5,}} onClick={() => {moveDown();}}>&#x25BC;</span>
        </div>}
      </div>
      </>
  );
};
  
  export default Counter;