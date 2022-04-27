import { Box, Heading, Link, Button } from "@chakra-ui/react";
import React from "react";

export const Home = () => {
  return (
    <Box>
      <Heading>Hello World</Heading>
      <Link href="/form">
        <Button>Form</Button>
      </Link>
    </Box>
  );
};
