import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

import { Form } from "./pages/Form";
import { Home } from "./pages/Home";
import { LoginRegister } from "./pages/LoginRegister";
import { Admin } from "./pages/Admin";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box backgroundColor="#FFF5F8" className="App" width="100%" height="100vh">
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
          <Route exact path="/form" element={<Form />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/login" element={<LoginRegister />}></Route>

          <Route></Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
