import {
  Button,
  FormControl,
  Input,
  Box,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isError = error === "";

  const handleSubmit = (event) => {
    setError("");

    axios
      .post("/adduser", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.added) {
          alert("Utilisateur Ajouté");
        } else {
          switch (res.data.err) {
            case "user":
              setError("Email déjà utilisé");
              break;
            case "format":
              setError("Format d'email invalide");
              break;
            case "params":
              setError("Paramètres invalides");
              break;
            default:
              alert("Erreur inconnue");
          }
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
        S'inscrire
      </Heading>
      <form onSubmit={handleSubmit} method="POST">
        <Box display="flex" flexDirection="row">
          {/* Form pour le prénom */}
          <FormControl mb={5} mr={5}>
            <FormLabel>Prénom</FormLabel>
            <Input
              isRequired
              type="text"
              placeholder="Prénom"
              value={firstname}
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>

          {/* Form pour le nom */}
          <FormControl mb={5}>
            <FormLabel>Nom</FormLabel>
            <Input
              isRequired
              type="text"
              placeholder="Nom"
              value={lastname}
              name="nom"
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
        </Box>

        {/* Form pour l'email */}
        <FormControl mb={5} isInvalid={!isError}>
          <FormLabel>Email</FormLabel>
          <Input
            isRequired
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />
          <FormHelperText textAlign="left">
            Utilisez votre mail étudiant (*@ynov.com)
          </FormHelperText>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <FormControl mb={5}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            isRequired
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Inscription</Button>
      </form>
    </Box>
  );
};
