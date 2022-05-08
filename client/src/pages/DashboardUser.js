import { Box, Flex, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";
import logoMutuari from "../logoMutuari.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { TableCustom } from "../components/utils/TableCustom";
import { Form } from "../components/dashboardUser/Form";

export const DashboardUser = () => {
  const [materials, setMaterials] = useState([]);
  const [materialsnotvalidated, setMaterialsnotvalidated] = useState([]);
  const [materialsrefused, setMaterialsrefused] = useState([]);
  useEffect(() => {
    axios.get("/users/3/borrow/validated").then((res) => {
      setMaterials(res.data);
    });
    axios.get("/users/3/borrow/tovalidate").then((res) => {
      setMaterialsnotvalidated(res.data);
    });
    axios.get("users/3/borrow/refused").then((res) => {
      setMaterialsrefused(res.data);
    });
  }, [materialsnotvalidated, materials]);
  return (
    <Box mb={5} p={5}>
      <Box boxSize="sm" height="100%">
        <Image src={logoMutuari}></Image>
      </Box>
      <Heading mb={5}>Dashboard User</Heading>
      <Flex alignItems="flex-start" justify="space-around">
        <VStack>
          <TableCustom
            materials={materials}
            admin={false}
            title="Emprunts validés"
          ></TableCustom>
          <TableCustom
            materials={materialsnotvalidated}
            admin={false}
            title="Emprunts non validés"
          ></TableCustom>
          <TableCustom
            materials={materialsrefused}
            admin={false}
            title="Emprunts refusés"
          ></TableCustom>
        </VStack>
        <Form></Form>
      </Flex>
    </Box>
  );
};
