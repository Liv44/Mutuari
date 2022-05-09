import { Box, Heading } from "@chakra-ui/react";
import { TableCustom } from "../../components/utils/TableCustom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Navbar } from "../../components/admin/NavBar";

export const AllReservations = () => {
  const [toValidate, setToValidate] = useState([]);
  const [validated, setValidated] = useState([]);
  const [refused, setRefused] = useState([]);
  const [isConnected, setConnected] = useState(false);
  axios.get("/authentification").then((res) => {
    if (res.data.auth === false) {
      setConnected(false);
      window.location.href = "/";
    } else if (res.data.auth && res.data.isAdmin === false) {
      setConnected(false);
      window.location.href = "/user";
    } else if (res.data.auth && res.data.isAdmin) {
      setConnected(true);
    }
  });
  useEffect(() => {
    axios.get("/borrow/tovalidate").then((res) => {
      setToValidate(res.data);
    });
    axios.get("/borrow/validated").then((res) => {
      setValidated(res.data);
    });
    axios.get("/borrow/refused").then((res) => {
      setRefused(res.data);
    });
  }, [validated, toValidate, refused]);
  return (
    isConnected && (
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Navbar selected="loans"></Navbar>
        <Box mr={20} mt={20} align="center">
          <TableCustom
            width="100%"
            materials={toValidate}
            title="Emprunts à valider"
            admin={true}
            buttons={true}
          ></TableCustom>
          <TableCustom
            materials={validated}
            title="Emprunts validés"
            admin={true}
          ></TableCustom>
          <TableCustom
            materials={refused}
            title="Emprunts refusés"
            admin={true}
          ></TableCustom>
        </Box>
      </Box>
    )
  );
};
