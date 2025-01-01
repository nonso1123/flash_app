import {
	Button,
	Flex,
	VStack,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Text,
	Image,
	HStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/useAuth";
import icon from "../assets/icons8-storyfire.svg";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { auth_login, loading, auth } = useContext(AuthContext);
	useEffect(() => {
		if (auth) {
			navigate("/", { replace: true }); // Redirect to the home page
		}
	}, [auth, navigate]);

	const handleLogin = () => {
		auth_login(username, password);
		sessionStorage.removeItem("scrollPosition");
	};
	const handleNav = () => {
		navigate("/register");
	};
	return (
		<>
			<Flex
				w="100vw"
				h="90px"
				bg="blue.600"
				justifyContent="center"
				alignItems="center"
			>
				<HStack>
					<Image boxSize="20%" src={icon} />
					<Text
						fontSize="24px"
						bgGradient="linear( palegreen, white)"
						bgClip="text"
						fontFamily="'Playfair Display', serif"
						fontStyle="italic"
					>
						Flashapp
					</Text>
				</HStack>
			</Flex>
			<Flex
				w="100%"
				h="calc(100vh - 90px)"
				justifyContent="center"
				alignItems="center"
			>
				<VStack alignItems="start" w="90%" maxW="400px" gap="30px">
					<Heading>Login</Heading>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							bg="white"
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							bg="white"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleLogin();
								}
							}}
						/>
					</FormControl>
					<VStack w="100%" alignItems="start" gap="20px">
						{loading ? (
							<Button
								w="100%"
								colorScheme="green"
								fontSize="18px"
								disabled="true"
							>
								Loading...
							</Button>
						) : (
							<Button
								onClick={handleLogin}
								w="100%"
								colorScheme="green"
								fontSize="18px"
							>
								Login
							</Button>
						)}

						<Text onClick={handleNav}>
							Dont have an account?{" "}
							<Text as="span" color="blue.500" cursor="pointer">
								Register
							</Text>
						</Text>
					</VStack>
				</VStack>
			</Flex>
		</>
	);
};

export default Login;
