// import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppProvider } from "../../AppProvider";

const TopNavInner = () => {

    // const { isComplete } = useContext(AppContext);
    // console.log(isComplete);

    return (
      <div style={{ margin: "20px auto 30px",display: "flex", width: "475px", justifyContent: "space-between",}}>
        <div style={{ textAlign: "left",}}><Link style={{ color:"#305bbf",}} to="/history">See workout history</Link></div>
        <div style={{ textAlign: "right",}}><Link style={{ color:"#305bbf",}} to="/">Start over</Link></div>
      </div>
    );
  
};

const TopNav = () => {
    return (
        <AppProvider>
            <TopNavInner />
        </AppProvider>
    );
  };

export default TopNav;