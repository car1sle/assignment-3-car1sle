import { Link } from "react-router-dom";

const TopNav = () => {

    return (
      <div style={{ margin: "20px auto 30px",display: "flex", width: "475px", justifyContent: "space-between",}}>
        <div style={{ textAlign: "left",}}><Link style={{ color:"#305bbf",}} to="/history">See workout history</Link></div>
        <div style={{ textAlign: "right",}}><Link style={{ color:"#305bbf",}} to="/">Start over</Link></div>
      </div>
    );
  
};

export default TopNav;