import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import trash from '../../images/trash.png';
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

const Counter = ({ label, duration, label2, progress, removeClick, desc }) => {

  const { timers, paused, reset } = useContext(AppContext);
  const navigate = useNavigate();

  return (
      <>
      {desc && <div style={{ margin: "10px 0 30px 0", }}><b>Description:</b> {desc}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "0 0 20px",}}>
        {removeClick ? <div style={{ width: "30px",}}><img alt="Delete" src={trash} style={{ width: "17px", height: "20px", cursor: paused ? "pointer" : "not-allowed", opacity: paused ? 1 : 0.5,}} onClick={() => {
          if (paused) {
            removeClick();
            reset();
            if (timers.length === 1) {
              navigate("/");
            }
          }
        }} /></div> : <div style={{ width: "30px",}}></div>}
        <div style={{ width: "170px",}}><StyledLabel>{label}:</StyledLabel><br></br><StyledCounter>{duration}</StyledCounter></div>
        <div>{label2}:<br></br><StyledCounter>{progress}</StyledCounter></div>
      </div>
      </>
  );
};
  
  export default Counter;