import { Box, Heading, Link, Button } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios.get("/users").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  console.log(allUsers);
  return (
    <Box>
      <Heading>Hello World</Heading>
      <Box>
        {allUsers.map((user, index) => {
          return <Box key={index}>{user.firstname}</Box>;
        })}
      </Box>
      <Link href="/form">
        <Button>Form</Button>
      </Link>
    </Box>
  );
};
