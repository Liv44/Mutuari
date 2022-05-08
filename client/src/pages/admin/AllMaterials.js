import { Box, Heading } from "@chakra-ui/react";
import { TableMaterials } from "../../components/admin/TableMaterials";
import { FormMaterial } from "../../components/admin/FormMaterial";

import React from "react";

export const AllMaterials = () => {
  return (
    <Box>
      <Heading>Admin</Heading>
      <TableMaterials></TableMaterials>
      <FormMaterial></FormMaterial>
    </Box>
  );
};
