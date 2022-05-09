import {
  Button,
  FormControl,
  Input,
  Box,
  FormLabel,
  FormHelperText,
  Link,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMail, setErrorMail] = useState(true);
  const [isErrorPassword, setErrorPassword] = useState(true);

  const handleSubmit = (event) => {
    setErrorMail(true);
    setErrorPassword(true);

    axios.post("/login", { email: email, password: password }).then((res) => {
      if (res.data.connected === true) {
        if (res.data.result.isAdmin === 1) {
          window.location.href = "/admin";
        } else if (res.data.result.isAdmin === 0) {
          window.location.href = "/user";
        }
      } else {
        switch (res.data.err) {
          case "user":
            setErrorMail(false);
            break;
          case "password":
            setErrorPassword(false);
            break;
          default:
            break;
        }
        event.preventDefault();
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
        Se connecter
      </Heading>
      <form onSubmit={handleSubmit} method="POST">
        <FormControl mb={5} isInvalid={!isErrorMail}>
          <FormLabel>Email</FormLabel>
          <Input
            isRequired
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>Utilisateur non trouvé</FormErrorMessage>
        </FormControl>
        <FormControl mb={5} isInvalid={!isErrorPassword}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            isRequired
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>Mot de passe incorrect</FormErrorMessage>

          <FormHelperText>
            Pas encore de compte ? Inscrivez-vous{" "}
            <Link href="/register" color="purple">
              ici
            </Link>
          </FormHelperText>
        </FormControl>
        <Button type="submit">Connexion</Button>
      </form>
    </Box>
  );
};
