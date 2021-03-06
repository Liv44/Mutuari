import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

import { Form } from "./pages/Form";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { DashboardUser } from "./pages/DashboardUser";
import { AdminCalendar } from "./pages/AdminCalendar";

import { Box } from "@chakra-ui/react";
import { AllReservations } from "./pages/admin/AllReservations";
import { AllMaterials } from "./pages/admin/AllMaterials";

function App() {
  return (
    <Box
      backgroundColor="background"
      className="App"
      width="100%"
      minHeight="100vh"
    >
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/user" element={<DashboardUser />}></Route>
          <Route exact path="/form" element={<Form />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/admin/calendar" element={<AdminCalendar />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/admin/reservations"
            element={<AllReservations />}
          ></Route>
          <Route
            exact
            path="/admin/materials"
            element={<AllMaterials />}
          ></Route>
          <Route></Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
