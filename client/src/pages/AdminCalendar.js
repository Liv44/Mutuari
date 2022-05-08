import { Box, Heading } from "@chakra-ui/react";
import { Calendar } from "../components/calendar/Calendar";
import React from "react";

export const AdminCalendar = () => {
  return (
    <Box>
        <Heading>Admin Calendrier</Heading>
        <Calendar></Calendar>
    </Box>
  );
};
