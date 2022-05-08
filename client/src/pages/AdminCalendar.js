import { Box, Heading } from "@chakra-ui/react";
import { Calendar } from "../components/admin/calendar/Calendar";
import React from "react";
import { Navbar } from "../components/admin/NavBar";

export const AdminCalendar = () => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Navbar selected="calendar"></Navbar>
        <Calendar></Calendar>
    </Box>
  );
};
