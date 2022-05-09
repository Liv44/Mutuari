import { Button } from "@chakra-ui/react";
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
  return (
    <Button
      width={200}
      minWidth={200}
      size="md"
      borderRadius={20}
      backgroundColor="red"
      mt={10}
      onClick={deconnexion}
    >
      Déconnexion
    </Button>
  );
};
