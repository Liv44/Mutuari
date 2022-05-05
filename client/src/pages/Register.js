import { Box, Heading, Image } from "@chakra-ui/react";
import logoMutuari from "../logoMutuari.svg";
import React from "react";
import { Form } from "../components/register/Form";

export const Register = () => {
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
