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
	const [loading, setLoading] = useState(null);
	const [isLogout, setIsLogout] = useState(null);
	const [email, setEmail] = useState(storage ? storage.email : "");
	const [firstName, setFirstName] = useState(storage ? storage.first_name : "");
	const [lastName, setLastName] = useState(storage ? storage.last_name : "");
	const [bio, setBio] = useState(storage ? storage.bio : "");
	const [profileImage, setProfileImage] = useState(
		storage ? storage.profile_image : ""
	);
	const navigate = useNavigate();
	const handleUpdate = async () => {
		setLoading(true);
		try {
			const formData = new FormData();

			// Add profile image only if it's a new file
			if (profileImage instanceof File) {
				formData.append("profile_image", profileImage);
			}

			// Append other fields
			formData.append("username", username);
			formData.append("email", email);
			formData.append("first_name", firstName);
			formData.append("last_name", lastName);
			formData.append("bio", bio);

			// Send the request and get the updated data from the backend
			const response = await update_user(username, formData);

			// Check for success response
			if (response.success) {
				// Update localStorage with the returned data
				localStorage.setItem("userData", JSON.stringify(response));

				// Update state
				setUsername(response.username);
				setEmail(response.email);
				setFirstName(response.first_name);
				setLastName(response.last_name);
				setBio(response.bio?.toString());
				setProfileImage(response.profile_image); // Update with new or old image
				navigate(`/${username}`);
				alert("Successfully updated");
			} else {
				alert("Error updating profile");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Error updating details");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		setIsLogout(true);
		try {
			await logout();
			navigate("/login");
			setIsLogout(false);
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
					{/* <FormControl>
						<FormLabel>Username</FormLabel>
						<Input
							bg="white"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl> */}
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
					{loading === true ? (
						<Button
							w="100%"
							colorScheme="blue"
							mt="10px"
							onClick={handleUpdate}
						>
							Saving Changes...
						</Button>
					) : (
						<Button
							w="100%"
							colorScheme="blue"
							mt="10px"
							onClick={handleUpdate}
						>
							Save Changes
						</Button>
					)}
				</VStack>

				{isLogout === true ? (
					<Button colorScheme="red" onClick={handleLogout}>
						Logging out...
					</Button>
				) : (
					<Button colorScheme="red" onClick={handleLogout}>
						Logout
					</Button>
				)}
			</VStack>
		</Flex>
	);
};

export default Setting;
