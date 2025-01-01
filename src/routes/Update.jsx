import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	VStack,
	Image,
	Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { update_post, get_post } from "../api/endpoints"; // Fetch & update API functions
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
	const { id } = useParams(); // Get post ID from the URL
	const navigate = useNavigate();
	const [description, setDescription] = useState("");
	const [postImage, setPostImage] = useState(null); // New image file if selected
	const [currentImage, setCurrentImage] = useState(""); // Existing image URL

	// Fetch the post details to pre-fill the form
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const post = await get_post(id); // Assume this API fetches a post by ID
				setDescription(post.description); // Set initial description
				setCurrentImage(post.post_image); // Set existing image URL
			} catch {
				alert("Error fetching post details");
			}
		};
		fetchPost();
	}, [id]);

	const user = JSON.parse(localStorage.getItem("userData"))["username"];
	// Handle update submission
	const handleUpdate = async () => {
		const formData = new FormData();
		formData.append("description", description);

		// Append the new image if selected, otherwise retain the current image
		if (postImage) {
			formData.append("post_image", postImage);
		}

		try {
			await update_post(id, formData); // Send updated data
			alert("Post updated successfully");
			navigate(`/${user}`); // Navigate back to home or another route
		} catch {
			alert("Error updating post");
		}
	};

	return (
		<Flex w="100%" h="100%" justifyContent="center" pt="50px">
			<VStack w="95%" maxW="450px" alignItems="start" gap="40px">
				<Heading>Update Post</Heading>
				<FormControl>
					<FormLabel>Description</FormLabel>
					<Textarea
						type="text"
						bg="white"
						rows="7"
						value={description} // Bind input to description state
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
				{/* Display the current image if no new image is selected
				{currentImage && !postImage && (
					<Image src={currentImage} alt="Current Post Image" boxSize="100px" />
				)} */}
				<Button w="100%" colorScheme="blue" onClick={handleUpdate} mb="20px">
					Update Post
				</Button>
			</VStack>
		</Flex>
	);
};

export default Update;
