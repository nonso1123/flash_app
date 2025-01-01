import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <VStack w="100vw" minH="100vh" bg="#FCFCFC">
      <Navbar />
      <Box w="100%">{children}</Box>
    </VStack>
  );
};

export default Layout;
