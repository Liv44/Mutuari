import { Box, Flex, Heading, VStack, Image, Button } from "@chakra-ui/react";
import React from "react";
import axios from "axios";

export const ButtonDeconnexion = () => {
  const deconnexion = () => {
    axios.get("/logout").then((res) => {
      if (res.data === "disconnected") {
        console.log("disconnected");
        window.location.href = "/";
      }
    });
  };
  return <Button onClick={deconnexion}>Déconnexion</Button>;
};
