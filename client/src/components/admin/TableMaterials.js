import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrMaterial } from "./TrMaterial";

export const TableMaterials = () => {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    axios.get("/materials").then((res) => {
      setMaterials(res.data);
    });
  }, [materials]);
  return (
    <Box
      boxShadow="xl"
      borderRadius="30px"
      overflow="scroll"
      mb={5}
      boxSize="2xl"
      backgroundColor="white"
      maxHeight="300px"
      width="100%"
      p={5}
    >
      <Heading as="h4" size="md" textAlign="left" mb={5}>
        Liste des matériels
      </Heading>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Description</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {materials.map((material, index) => {
            return <TrMaterial key={index} material={material}></TrMaterial>;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
