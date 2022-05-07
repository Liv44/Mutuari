import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React from "react";
import { getDateString } from "../../utils";

export const TableCustom = ({ materials, title, admin, buttons }) => {
  const materialsSorted = materials.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  return (
    <Box
      boxShadow="xl"
      borderRadius="30px"
      overflow="scroll"
      mb={5}
      boxSize="2xl"
      backgroundColor="white"
      maxHeight="250px"
      p={5}
    >
      <Heading as="h4" size="md" textAlign="left" mb={5}>
        {title}
      </Heading>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Nom</Th>
            {admin ? <Th>Par</Th> : null}
            <Th date>Du</Th>
            <Th date>Au</Th>
          </Tr>
        </Thead>
        <Tbody>
          {materialsSorted.map((material, index) => {
            const startDate = material.startDate;
            getDateString(startDate);
            return (
              <Tr key={index}>
                <Td fontWeight="semibold">{material.name}</Td>
                {admin ? (
                  <Td fontWeight="semibold">
                    {material.firstname} {material.lastname}
                  </Td>
                ) : null}
                <Td date fontWeight="semibold">
                  {getDateString(material.startDate)}
                </Td>
                <Td date fontWeight="semibold">
                  {getDateString(material.endDate)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
