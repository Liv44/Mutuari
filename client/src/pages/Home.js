import { Box, Image, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import logoMutuari from "../logoMutuari.svg";
import { Form } from "../components/connexion/Form";
import axios from "axios";

export const Home = () => {
  useEffect(() => {
    axios.get("/authentification").then((res) => {
      if (res.data.auth === true) {
        if (res.data.isAdmin === true) {
          window.location.href = "/admin/materials";
        } else if (res.data.isAdmin === false) {
          window.location.href = "/user";
        }
      }
    });
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src={logoMutuari}></Image>
      <Heading mb={5}>
        Le service d’emprunt de matériel de Nantes Ynov Campus
      </Heading>
      <Form />
    </Box>
  );
};
