import {
	VStack,
	Flex,
	FormControl,
	Input,
	Button,
	FormLabel,
	Heading,
	Text,
	FormHelperText,
} from "@chakra-ui/react";
import { register, check_username } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [isChecking, setIsChecking] = useState(false); // To handle API status
	const navigate = useNavigate();

	const validateFields = async () => {
		const newErrors = {};

		if (!username.trim()) newErrors.username = "Username is required.";
		if (!email.trim()) newErrors.email = "Email is required.";
		if (!firstName.trim()) newErrors.firstName = "First name is required.";
		if (!lastName.trim()) newErrors.lastName = "Last name is required.";
		if (!password.trim()) newErrors.password = "Password is required.";
		if (!confirmPassword.trim())
			newErrors.confirmPassword = "Confirm password is required.";
		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
		}

		// Check username availability
		if (!newErrors.username) {
			try {
				const response = await check_username(username);

				if (!response.available) {
					newErrors.username = "Username is already taken.";
				}
			} catch (error) {
				newErrors.username = "Error checking username availability.";
			} finally {
				setIsChecking(false);
			}
		}

		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			setIsChecking(true);
		}
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};
	const validateUsername = async (username) => {
		const newErrors = {};

		if (!username.trim()) newErrors.username = "Username is required.";

		if (!newErrors.username) {
			// setIsChecking(true);

			try {
				const response = await check_username(username);
				if (!response.available) {
					newErrors.username = "Username is already taken.";
				}
			} catch (error) {
				newErrors.username = "Error checking username availability.";
			} finally {
				setIsChecking(false);
			}
		}
		setErrors(newErrors);
	};

	const handleRegister = async () => {
		const isValid = await validateFields();
		if (!isValid) return;

		try {
			await register(username, password, email, firstName, lastName);
			alert("Successful registration");
			navigate("/login");
		} catch {
			alert("Error registering");
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

				<FormControl isInvalid={errors.username}>
					<FormLabel htmlFor="username">Username</FormLabel>
					<Input
						value={username}
						onChange={(e) => {
							const value = e.target.value; // Get the input value
							setUsername(value); // Update the username state

							validateUsername(value);
						}}
						bg="white"
						type="text"
					/>
					{errors.username && (
						<FormHelperText color="red.500">{errors.username}</FormHelperText>
					)}
				</FormControl>

				<FormControl isInvalid={errors.email}>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						bg="white"
						type="email"
					/>
					{errors.email && (
						<FormHelperText color="red.500">{errors.email}</FormHelperText>
					)}
				</FormControl>

				<FormControl isInvalid={errors.firstName}>
					<FormLabel htmlFor="firstName">First Name</FormLabel>
					<Input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						bg="white"
						type="text"
					/>
					{errors.firstName && (
						<FormHelperText color="red.500">{errors.firstName}</FormHelperText>
					)}
				</FormControl>

				<FormControl isInvalid={errors.lastName}>
					<FormLabel htmlFor="lastName">Last Name</FormLabel>
					<Input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						bg="white"
						type="text"
					/>
					{errors.lastName && (
						<FormHelperText color="red.500">{errors.lastName}</FormHelperText>
					)}
				</FormControl>

				<FormControl isInvalid={errors.password}>
					<FormLabel htmlFor="password">Password</FormLabel>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						bg="white"
						type="password"
					/>
					{errors.password && (
						<FormHelperText color="red.500">{errors.password}</FormHelperText>
					)}
				</FormControl>

				<FormControl isInvalid={errors.confirmPassword}>
					<FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
					<Input
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						bg="white"
						type="password"
					/>
					{errors.confirmPassword && (
						<FormHelperText color="red.500">
							{errors.confirmPassword}
						</FormHelperText>
					)}
				</FormControl>

				<VStack w="100%" alignItems="start" gap="10px">
					<Button
						onClick={handleRegister}
						w="100%"
						colorScheme="green"
						fontSize="18px"
						isLoading={isChecking}
					>
						Register
					</Button>
					<Text color="gray.500">
						Already have an account?{" "}
						<Text
							onClick={handleNav}
							as="span"
							color="blue.500"
							cursor="pointer"
						>
							Log in
						</Text>
					</Text>
				</VStack>
			</VStack>
		</Flex>
	);
};

export default Register;
