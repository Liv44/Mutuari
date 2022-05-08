import { Box, Heading } from "@chakra-ui/react";
import { TableMaterials } from "../../components/admin/TableMaterials";
import { FormMaterial } from "../../components/admin/FormMaterial";
import {Navbar} from "../../components/admin/NavBar"

import React from "react";

export const AllMaterials = () => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Navbar selected="materials"></Navbar>
      <Box mr={20}>
        <TableMaterials></TableMaterials>
        <FormMaterial></FormMaterial>
      </Box>
    </Box>
  );
};
