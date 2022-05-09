import {
  Button,
  FormControl,
  Input,
  Box,
  FormLabel,
  FormErrorMessage,
  Heading,
  Select,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isErrorDate, setErrorDate] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [materialID, setMaterialID] = useState("");
  const [disponibility, setDisponibility] = useState(true);
  const [notAvailable, setAvailable] = useState(false);

  useEffect(() => {
    axios.get("/materials").then((res) => {
      setMaterials(res.data);
    });
  }, [materials]);
  const handleSubmit = (event) => {
    const userID = 3;
    axios
      .post("/newborrow", { materialID, userID, startDate, endDate })
      .then((res) => {
        if (res.data.added) {
          setStartDate("");
          setEndDate("");
          setMaterialID("");
          setDisponibility(true);
          setAvailable(false);
          alert("L'emprunt a bien été enregistré.");
        } else {
          alert("Il y a eu un problème lors de l'enregistrement de l'emprunt.");
        }
      });
    event.preventDefault();
  };
  useEffect(() => {
    if (endDate < startDate && endDate !== "") {
      setErrorDate(true);
    } else if (
      endDate.length !== 0 &&
      startDate.length !== 0 &&
      materialID.length !== 0
    ) {
      setErrorDate(false);
      axios
        .get(
          "/materials/" + materialID + "/borrow/" + startDate + "/" + endDate
        )
        .then((res) => {
          setDisponibility(res.data.disponibility);
        });
    }
    if (disponibility === false && isErrorDate === false) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [
    materialID,
    startDate,
    endDate,
    disponibility,
    isErrorDate,
    notAvailable,
  ]);

  return (
    <Box
      ml={5}
      boxShadow="xl"
      borderRadius="30px"
      padding={10}
      backgroundColor="white"
    >
      <Heading as="h3" size="lg" textAlign="left" mb={5}>
        Emprunter un matérial
      </Heading>
      <form onSubmit={handleSubmit} method="POST">
        <Flex>
          <FormControl mr={5}>
            <FormLabel>Date d'emprunt</FormLabel>
            <Input
              isRequired
              type="date"
              placeholder="Date d'emprunt"
              value={startDate}
              name="startDate"
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date de retour</FormLabel>
            <Input
              type="date"
              placeholder="Date de retour"
              value={endDate}
              name="endDate"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </FormControl>
        </Flex>
        <FormControl mb={5} isInvalid={isErrorDate}>
          <FormErrorMessage color="red">
            La date d'emprunt doit être avant la date de retour.
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={notAvailable}>
          <Select
            isRequired
            onChange={(e) => {
              setMaterialID(e.target.value);
            }}
            value={materialID}
          >
            <option value="" selected disabled>
              Choisir un matériel
            </option>
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage color="red">
            Ce matériel n'est pas disponible aux dates entrées.
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <Button
            color="white"
            backgroundColor="darkpurple"
            type="submit"
            isDisabled={!disponibility}
            _hover={
              disponibility
                ? {
                    backgroundColor: "white",
                    color: "purple",
                    borderColor: "purple",
                    border: "2px",
                  }
                : {}
            }
            _focus={{
              boxShadow: "none",
            }}
          >
            Valider l'emprunt
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
