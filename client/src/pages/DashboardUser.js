import { Box, Flex, Heading, VStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import logoMutuari from "../logoMutuari.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { TableCustom } from "../components/utils/TableCustom";
import { Form } from "../components/dashboardUser/Form";
import { ButtonDeconnexion } from "../components/utils/ButtonDeconnexion";

export const DashboardUser = () => {
  const [materials, setMaterials] = useState([]);
  const [materialsnotvalidated, setMaterialsnotvalidated] = useState([]);
  const [materialsrefused, setMaterialsrefused] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get("/authentification").then((res) => {
      if (res.data.auth === false) {
        window.location.href = "/";
      } else if (res.data.auth && res.data.isAdmin === false) {
        setUser(res.data.userName);
        axios.get("/users/3/borrow/validated").then((res) => {
          setMaterials(res.data);
        });
        axios.get("/users/3/borrow/tovalidate").then((res) => {
          setMaterialsnotvalidated(res.data);
        });
        axios.get("users/3/borrow/refused").then((res) => {
          setMaterialsrefused(res.data);
        });
      } else if (res.data.auth && res.data.isAdmin) {
        window.location.href = "/admin";
      }
    });
  }, [materialsnotvalidated, materials]);

  return (
    <Box mb={5} p={5}>
      <Box boxSize="sm" height="100%" display="flex" justify="space-around">
        <Image src={logoMutuari}></Image>
        <ButtonDeconnexion />
      </Box>
      <Heading>Dashboard User</Heading>
      <Text mb={5}>Connected as : {user}</Text>

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
