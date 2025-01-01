import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { create_post } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
	const navigate = useNavigate();
	const [description, setDescription] = useState("");
	const [postImage, setPostImage] = useState("");

	const handlePost = async () => {
		try {
			const data = await create_post({
				description: description,
				post_image: postImage,
			});
			alert("Post created successfully");
			navigate(`/`);
		} catch {
			alert("error creating post");
		}
	};
	return (
		<Flex w="100%" h="100%" justifyContent="center" pt="50px">
			<VStack w="95%" maxW="450px" alignItems="start" gap="40px">
				<Heading>Create Post</Heading>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea
						type="text"
						rows="7"
						bg="white"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Add image</FormLabel>
					<input
						bg="white"
						type="file"
						onChange={(e) => setPostImage(e.target.files[0])}
					/>
				</FormControl>
				<Button w="100%" colorScheme="blue" onClick={handlePost}>
					Create Post
				</Button>
			</VStack>
		</Flex>
	);
};

export default CreatePost;
