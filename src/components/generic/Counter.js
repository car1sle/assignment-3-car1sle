import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import trash from '../../images/trash.png';
import { AppContext } from "../../AppProvider";
import { PATHS } from "../../constants";

const StyledCounter = styled.div`
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  letter-spacing: -0.75px;
  display: inline-block;
`;

const Counter = ({ label, duration, progress, removeClick }) => {

  const { timers, paused, reset } = useContext(AppContext);
  const navigate = useNavigate();

  return (
      <div style={{ display: "flex", alignItems: "center", gap: "35px", padding: "0 0 20px",}}>
        {removeClick ? <img alt="Delete" src={trash} style={{ width: "17px", height: "20px", cursor: paused ? "pointer" : "not-allowed", opacity: paused ? 1 : 0.5,}} onClick={() => {
          if (paused) {
            removeClick();
            reset();
            if (timers.length === 1) {
              navigate(PATHS.HOME);
            }
          }
        }} /> : <div style={{ width: "17px",}}></div>}
        <div>{label}:<br></br><StyledCounter>{duration}</StyledCounter></div>
        {progress && <div>Your progress:<br></br><StyledCounter>{progress}</StyledCounter></div>}
      </div>
  );
};
  
  export default Counter;