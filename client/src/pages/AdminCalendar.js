import { Box, Heading } from "@chakra-ui/react";
import { Calendar } from "../components/admin/calendar/Calendar";
import React, { useState } from "react";
import { Navbar } from "../components/admin/NavBar";
import axios from "axios";

export const AdminCalendar = () => {
  const [isConnected, setConnected] = useState(false);

  axios.get("/authentification").then((res) => {
    if (res.data.auth === false) {
      window.location.href = "/";
    } else if (res.data.auth && res.data.isAdmin === false) {
      window.location.href = "/user";
    } else if (res.data.auth && res.data.isAdmin) {
      setConnected(true);
    }
  });
  return (
    isConnected && (
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Navbar selected="calendar"></Navbar>
        <Calendar></Calendar>
      </Box>
    )
  );
};
