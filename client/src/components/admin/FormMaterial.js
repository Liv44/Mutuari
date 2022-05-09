import {
  Button,
  FormControl,
  Input,
  Box,
  FormLabel,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";

export const FormMaterial = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    axios
      .post("/newmaterial", { name: name, description: description })
      .then((res) => {
        if (res.data.added) {
          alert("Material added successfully");
          setName("");
          setDescription("");
        }
      });
    event.preventDefault();
  };
  return (
    <Box
      maxW="sm"
      boxShadow="xl"
      borderRadius="30px"
      padding={10}
      backgroundColor="white"
      overflow="hidden"
    >
      <Heading as="h3" size="lg" textAlign="left" mb={5}>
        Ajouter un matériel
      </Heading>
      <form onSubmit={handleSubmit} method="POST">
        <FormControl mb={5}>
          <FormLabel>Nom</FormLabel>
          <Input
            isRequired
            type="text"
            placeholder="Nom du matériel"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Description</FormLabel>
          <Textarea
            isRequired
            type="text"
            placeholder="Description du matériel"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button type="submit" backgroundColor="purple" color="white">
          Ajouter
        </Button>
      </form>
    </Box>
  );
};
