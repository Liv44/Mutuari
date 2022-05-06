import {
  Button,
  FormControl,
  Input,
  Box,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Select,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const Form = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isErrorDate, setErrorDate] = useState(true);
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    axios.get("/materials").then((res) => {
      setMaterials(res.data);
    });
  }, []);
  const handleSubmit = (event) => {
    setErrorDate(true);
    // axios
    //   .post("/login", { startDate: startDate, endDate: endDate })
    //   .then((res) => {});
    event.preventDefault();
  };
  const CheckMaterial = (e) => {
    const materialID = e.target.value;
    if (startDate === "" || endDate === "") {
      setErrorDate(false);
    }
    console.log(
      "/materials/" +
        materialID +
        '/borrow/"' +
        startDate +
        '"/"' +
        endDate +
        '"'
    );
    axios.get("/materials/" + materialID + "/borrow").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <Box
      ml={5}
      boxShadow="xl"
      borderRadius="30px"
      padding={10}
      backgroundColor="white"
      overflow="hidden"
    >
      <Heading as="h3" size="lg" textAlign="left" mb={5}>
        Emprunter un matérial
      </Heading>
      <form onSubmit={handleSubmit} method="POST">
        <Flex>
          <FormControl mb={5}>
            <FormLabel>Date d'emprunt</FormLabel>
            <Input
              isRequired
              type="date"
              placeholder="Date d'emprunt"
              value={startDate}
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormErrorMessage>
              La date d'emprunt ne peut pas être avant la date de retour.
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={!isErrorDate}>
            <FormLabel>Date de retour</FormLabel>
            <Input
              isRequired
              type="date"
              placeholder="Date de retour"
              value={endDate}
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FormErrorMessage>
              La date d'emprunt ne peut pas être avant la date de retour.
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl>
          <Select onChange={CheckMaterial}>
            <option value="">Choisir un matériel</option>
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </Select>
          <FormHelperText textAlign="left">
            Si le matériel que vous cherchez n'est pas dans la liste, c'est
            qu'il n'est pas disponible pour les dates sélectionnées.
          </FormHelperText>
        </FormControl>
        <Button type="submit">Valider</Button>
      </form>
    </Box>
  );
};
