import React, { useContext } from "react";
import { AppContext, AppProvider } from "../AppProvider";
import { Link } from "react-router-dom";
import TopNav from "../components/generic/TopNav";

const HistoryViewInner = () => {

    const { timers, completedWorkouts } = useContext(AppContext);

    const Arrow = () => {
        return <>&#8678;</>
    };

    return (
        <>
            <TopNav />
            <div style={{ textAlign: "center", textDecoration: "underline", margin: "40px 0 0",}}>Completed workouts</div>
            <div style={{ textAlign: "center", margin: "50px 0",}}>
                <Link style={{ textAlign: "center", color:"#305bbf", fontWeight: "700", fontSize:"18px",}} to={`/w/${encodeURI(encodeURI(JSON.stringify(timers)))}`}><Arrow />&nbsp;&nbsp;Back to workout</Link>
            </div>
        </>
    );

};

const HistoryView = () => {

    return (
        <AppProvider>
            <HistoryViewInner />
        </AppProvider>
    );

};

export default HistoryView;