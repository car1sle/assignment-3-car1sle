import React from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import ButtonsView from "./views/ButtonsView";
import { AppProvider } from "./AppProvider";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const TimersPage = () => {
  return (
    <Container>
      <AppProvider>
        <ButtonsView />
        <TimersView />
        <div style={{ margin: "0 auto 50px", textAlign: "center",}}>
          <Link to="/assignment-2-car1sle/add">
            <button style={{ margin: "0 auto", textAlign: "center",}}>Add a timer</button>
          </Link>
        </div>
      </AppProvider>
    </Container>
  );
};

const Arrow = () => {
  return <>&#8678;</>
};

const CreateTimerPage = () => {
  return (
    <Container>
      <AppProvider>
        <div style={{ margin: "0 auto", textAlign: "center",}}>
          <Link to="/assignment-2-car1sle/">
            <div style={{ margin: "15px auto", textAlign: "center", textDecoration: "underline", color: "#305bbf",}}><Arrow /> Go back to workout</div>
          </Link>
        </div>
        <CreateTimerView />
      </AppProvider>
    </Container>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/assignment-2-car1sle" element={<TimersPage />} />
        <Route path="/assignment-2-car1sle/add" element={<CreateTimerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
