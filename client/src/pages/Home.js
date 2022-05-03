import { Box, Image, Heading } from "@chakra-ui/react";
import React from "react";
import logoMutuari from "../logoMutuari.svg";
import { Form } from "../components/connexion/Form";

export const Home = () => {
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
