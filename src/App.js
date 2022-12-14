import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import ButtonsView from "./views/ButtonsView";
import TopNav from "./components/generic/TopNav";
import { AppProvider, AppContext } from "./AppProvider";
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={{textAlign: "center",}}>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <Link style={{ color:"#305bbf",}} to="/">Start over</Link>
  </div>
);

const StyledContainer = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const Container = ({ children }) => {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <StyledContainer>{children}</StyledContainer>
    </ErrorBoundary>
  );
};

const RedirectToHomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    
    setTimeout(() => {
      navigate("/");
    }, "1500")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ textAlign: "center", margin: "50px 0",}}>This page doesn't exist!<br /><br />Redirecting you to homepage</div>;

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
      <AppProvider>
        <TopNav />
        <HomePageInner />
      </AppProvider>
    </Container>
  );
};

const TimersPageInner = () => {

  const { timers, paused, setShowAddToHistory } = useContext(AppContext);

  useEffect(() => {
    setShowAddToHistory(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

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
      <AppProvider>
        <TopNav />
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
      <AppProvider>
        <TopNav />
        <CreateTimerPageInner />
      </AppProvider>
    </Container>
  );
};

const HistoryViewInner = () => {

  const { timers, setShowAddToHistory } = useContext(AppContext);

  const Arrow = () => {
      return <>&#8678;</>
  };

  useEffect(() => {
    setShowAddToHistory(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  return (
      <>
          <div style={{ textAlign: "center", textDecoration: "underline", margin: "40px 0 0",}}>Completed workouts</div>
          <div style={{ textAlign: "center", margin: "50px 0",}}>
              <Link style={{ textAlign: "center", color:"#305bbf", fontWeight: "700", fontSize:"18px",}} to={ (timers.length > 0) ? `/w/${encodeURI(encodeURI(JSON.stringify(timers)))}` : "/"}><Arrow />&nbsp;&nbsp;Back to workout</Link>
          </div>
      </>
  );

};

const HistoryView = () => {

  return (
    <Container>
      <AppProvider>
        <TopNav />
        <HistoryViewInner />
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
