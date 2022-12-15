import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppProvider";

const TopNav = () => {

  const { isComplete, addToHistory, showAddToHistory, setShowAddToHistory } = useContext(AppContext);

  useEffect(() => {
    if (isComplete) {
      setShowAddToHistory(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isComplete])

  return (
    <div style={{ margin: "20px auto 30px",display: "flex", width: "475px", justifyContent: "space-between",}}>
      <div style={{ textAlign: "left",}}>
        <Link style={{ color:"#305bbf",}} to="/history">See workout history</Link>
      </div>
      {showAddToHistory && <div>
        <button style={{ margin: "0 auto", textAlign: "center",}} onClick={() => {
          addToHistory();
          setShowAddToHistory(false);
        }}>Add to workout history</button>
      </div>}
      <div style={{ textAlign: "right",}}>
        <Link style={{ color:"#305bbf",}} to="/">Start over</Link>
      </div>
    </div>
  );
};

export default TopNav;