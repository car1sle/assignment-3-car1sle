import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import ButtonsView from "./views/ButtonsView";
import HistoryView from "./views/HistoryView";
import TopNav from "./components/generic/TopNav";
import { AppProvider, AppContext } from "./AppProvider";
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const RedirectToHomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    
    setTimeout(() => {
      navigate("/");
    }, "1500")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ textAlign: "center", margin: "50px 0",}}>This page doesn't exist!<br /><br />Redirecting you to homepage</div>

};

const HomePageInner = () => {

  const { setTimers, reset } = useContext(AppContext);

  useEffect(() => {
    setTimers([]);
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ margin: "50px auto", textAlign: "center",}}>
        <div style={{ margin: "0 0 30px",}}>You have no timers in the queue.</div>
        <Link to="/add">
          <button style={{ margin: "0 auto", textAlign: "center",}}>Build your workout</button>
        </Link>
      </div>
    </>
  );

};

const HomePage = () => {
  return (
    <Container>
      <TopNav />
      <AppProvider>
        <HomePageInner />
      </AppProvider>
    </Container>
  );
};

const TimersPageInner = () => {

  const { timers, paused } = useContext(AppContext);

  return (
    <>
      <ButtonsView />
      <TimersView />
      <div style={{ display: "flex", margin: "0 auto 50px", justifyContent: "center",}}>
        <Link to="/add">
          <button disabled={(timers.length === 0) ? false : !paused} style={{ margin: "0 5px", textAlign: "center", width: "90px",}}>Add a timer</button>
        </Link>
      </div>
    </>
  );

};

const TimersPage = () => {
  return (
    <Container>
      <TopNav />
      <AppProvider>
        <TimersPageInner />
      </AppProvider>
    </Container>
  );
};

const CreateTimerPageInner = () => {

  const { timers } = useContext(AppContext);

  const Arrow = () => {
    return <>&#8680;</>
  };

  return (
    <>
      {timers.length > 0 &&
        <div style={{ margin: "0 auto", textAlign: "center",}}>
          <Link style={{ color:"#305bbf",}} to={`/w/${encodeURI(encodeURI(JSON.stringify(timers)))}`}>
            <div style={{ margin: "15px auto", textAlign: "center", textDecoration: "underline", fontWeight: "700", fontSize: "18px",}}>Go to your workout&nbsp;&nbsp;<Arrow /></div>
          </Link>
        </div>
      }
      <CreateTimerView />
    </>
  );

};

const CreateTimerPage = () => {
  return (
    <Container>
      <TopNav />
      <AppProvider>
        <CreateTimerPageInner />
      </AppProvider>
    </Container>
  );
};

const App = () => {
  return (
    <Router basename="/workout">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<CreateTimerPage />} />
        <Route path="/w/:path" element={<TimersPage />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="*" element={<RedirectToHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
