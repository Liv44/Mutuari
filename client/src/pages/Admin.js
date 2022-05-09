import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { AllReservations } from "./admin/AllReservations";

export const Admin = () => {
  axios.get("authentification").then((res) => {
    if (res.data.auth === false) {
      window.location.href = "/";
    } else if (res.data.auth && res.data.isAdmin === false) {
      window.location.href = "/user";
    } else if (res.data.auth && res.data.isAdmin) {
      window.location.href = "/admin/calendar";
    }
  });
};
