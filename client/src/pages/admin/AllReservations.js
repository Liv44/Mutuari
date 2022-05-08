import { Box, Heading } from "@chakra-ui/react";
import { TableCustom } from "../../components/utils/TableCustom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const AllReservations = () => {
  const [toValidate, setToValidate] = useState([]);
  const [validated, setValidated] = useState([]);
  const [refused, setRefused] = useState([]);

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
    <Box>
      <Heading>Admin</Heading>
      <TableCustom
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
  );
};
