import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { logout, update_user } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const Setting = () => {
	const storage = JSON.parse(localStorage.getItem("userData"));
	const [username, setUsername] = useState(storage ? storage.username : "");
	const [email, setEmail] = useState(storage ? storage.email : "");
	const [firstName, setFirstName] = useState(storage ? storage.first_name : "");
	const [lastName, setLastName] = useState(storage ? storage.last_name : "");
	const [bio, setBio] = useState(storage ? storage.bio : "");
	const [profileImage, setProfileImage] = useState(
		storage ? storage.profile_image : ""
	);
	const navigate = useNavigate();
	const handleUpdate = async () => {
		try {
			await update_user({
				username: username,
				profile_image: profileImage,
				email: email,
				first_name: firstName,
				last_name: lastName,
				bio: bio,
			});

			localStorage.setItem(
				"userData",
				JSON.stringify({
					username: username,
					email: email,
					first_name: firstName,
					last_name: lastName,
					bio: bio,
				})
			);
			sessionStorage.removeItem("scrollPosition");
			navigate(`/${username}`);
			alert("successfully updated");
		} catch {
			alert("error updating details");
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch {
			alert("error logging out");
		}
	};
	return (
		<Flex w="100%" justifyContent="center" pt="50px">
			<VStack w="95%" maxW="500px" alignItems="start" gap="20px">
				<Heading>Settings</Heading>
				<VStack w="100%" alignItems="start" gap="10px">
					<FormControl>
						<FormLabel>Profile Picture</FormLabel>
						<input
							bg="white"
							type="file"
							onChange={(e) => setProfileImage(e.target.files[0])}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Username</FormLabel>
						<Input
							bg="white"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							bg="white"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>First Name</FormLabel>
						<Input
							bg="white"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Last Name</FormLabel>
						<Input
							bg="white"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Bio</FormLabel>
						<Textarea
							bg="white"
							type="text"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
					</FormControl>
					<Button w="100%" colorScheme="blue" mt="10px" onClick={handleUpdate}>
						Save Changes
					</Button>
				</VStack>
				<Button colorScheme="red" onClick={handleLogout}>
					Logout
				</Button>
			</VStack>
		</Flex>
	);
};

export default Setting;
