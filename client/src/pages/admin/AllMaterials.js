import { Box, Heading } from "@chakra-ui/react";
import { TableMaterials } from "../../components/admin/TableMaterials";
import { FormMaterial } from "../../components/admin/FormMaterial";
import { Navbar } from "../../components/admin/NavBar";
import axios from "axios";
import React, { useState } from "react";

export const AllMaterials = () => {
  const [isConnected, setConnected] = useState(false);
  axios.get("/api/authentification").then((res) => {
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
  return (
    isConnected && (
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Navbar selected="materials"></Navbar>
        <Box mr={20}>
          <TableMaterials></TableMaterials>
          <FormMaterial></FormMaterial>
        </Box>
      </Box>
    )
  );
};
