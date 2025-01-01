import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Image,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { search_user } from "../api/endpoints";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState([]);

	const handleSearch = async () => {
		const users = await search_user(search);
		setUsers(users);
	};

	return (
		<Flex w="100%" justifyContent="center" pt="50px">
			<VStack w="95%" maxW="500px" alignItems="start" gap="20px">
				<Heading>Search Users</Heading>
				<HStack w="100%" gap="0">
					<Input bg="white" onChange={(e) => setSearch(e.target.value)} />
					<Button colorScheme="blue" onClick={handleSearch}>
						Search
					</Button>
				</HStack>
				<VStack w="100%">
					{users.map((user) => (
						<UserProfile
							username={user.username}
							profile_image={user.profile_image}
							first_name={user.first_name}
							last_name={user.last_name}
						/>
					))}
				</VStack>
			</VStack>
		</Flex>
	);
};

export default Search;

const UserProfile = ({ username, profile_image, first_name, last_name }) => {
	const navigate = useNavigate();
	const handleNav = () => {
		navigate(`/${username}`);
	};
	return (
		<Flex
			onClick={handleNav}
			cursor="pointer"
			w="100%"
			h="100px"
			border="1px solid"
			justifyContent="center"
			alignItems="center"
			bg="white"
			borderColor="gray.300"
			borderRadius="8px"
		>
			<HStack w="90%" gap="20px" alignItems="center">
				<Box
					boxSize="70px"
					border="2px solid"
					borderColor="gray.700"
					bg="white"
					borderRadius="full"
					overflow="hidden"
				>
					<Image
						src={`${BASE_URL}${profile_image}`}
						boxSize="100%"
						objectFit="cover"
					/>
				</Box>
				<VStack alignItems="start">
					<Text fontWeight="medium">
						{first_name} {last_name}
					</Text>
					<Text color="gray.600" fontSize="15px">
						@{username}
					</Text>
				</VStack>
			</HStack>
		</Flex>
	);
};
