import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    lightpink: "#E9D5DA",
    white: "#FFFFFF",
    lavender: "#827397",
    purple: "#4D4C7D",
    darkpurple: "#363062",
    red: "#FF6C6C",
    background: "#FFF5F8",
  },
  fonts: {
    body: "Montserrat",
    heading: "montserrat",
    mono: "Monserrat",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
