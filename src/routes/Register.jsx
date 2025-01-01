import {
  Button,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { register } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        await register(username, password, email, firstName, lastName);
        alert("Successful registration");
        navigate("/login");
      } catch {
        alert("error registering");
      }
    } else {
      alert("password and confirm password are not identical");
    }
  };
  const handleNav = () => {
    navigate("/login");
  };
  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <VStack
        alignItems="start"
        w="95%"
        maxW="400px"
        gap="20px"
        justifyContent="center"
      >
        <Heading mt="40px">Register</Heading>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            bg="white"
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">First Name</FormLabel>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="username">Last Name</FormLabel>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            type="password"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="white"
            type="password"
          />
        </FormControl>
        <VStack w="100%" alignItems="start" mb="40px" gap="20px">
          <Button
            onClick={handleRegister}
            w="100%"
            colorScheme="green"
            fontSize="18px"
          >
            Register
          </Button>
          <Text onClick={handleNav}>
            Already have an account?{" "}
            <Text as="span" color="blue.500" cursor="pointer">
              Log in
            </Text>
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default Register;
