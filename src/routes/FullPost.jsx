import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { get_post, toggleLike } from "../api/endpoints"; // Import the toggle_like endpoint
import { BASE_URL } from "../constants/constants";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const FullPost = () => {
	const { id } = useParams(); // Get the post ID from the URL
	const [post, setPost] = useState(null);
	const [likeCount, setLikeCount] = useState(0);
	const [liked, setLiked] = useState(false);
	const navigate = useNavigate();
	const location = useLocation(); // Get the location object
	const stateData = location.state; // Access the passed state

	// Fetch post details on mount
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await get_post(id); // Fetch the full post details
				setPost(data);
				setLikeCount(data.like_count); // Set the initial like count
				setLiked(data.liked); // Set the initial like state
			} catch {
				alert("Error fetching post");
			}
		};
		fetchPost();
	}, [id]);

	// Handle like/unlike functionality
	const handleToggleLike = async () => {
		try {
			const data = await toggleLike(id); // Call toggle_like API
			setLikeCount(data.like_count); // Update like count
			setLiked(data.now_liked); // Update liked state
		} catch {
			alert("Error toggling like");
		}
	};
	const nav = useNavigate();
	const handleViewProfile = () => {
		sessionStorage.removeItem("scrollPosition");
		nav(`/${stateData.username}`);
	};

	if (!post) return <Heading textAlign="center">Post not Found</Heading>;

	return (
		<Flex w="100%" justifyContent="start">
			<VStack w="100%" p="20px" alignItems="start">
				<Button
					mb="10px"
					colorScheme="blue"
					onClick={() => navigate(-1)} // Navigate to the previous page
				>
					Back
				</Button>
				<HStack fontSize={{ base: "16px", sm: "20px" }} fontWeight="bold">
					<Text>
						posted by{" "}
						<Text
							as="span"
							onClick={handleViewProfile}
							style={{
								color: "blue",
								fontStyle: "italic",
								fontFamily: "serif",
								cursor: "pointer",
							}}
						>
							{stateData.username}
						</Text>
					</Text>
					<Text ml={{ base: "8px", sm: "20px" }}>
						@{stateData.formatted_date}
					</Text>
				</HStack>
				{post.post_image === null ? (
					<></>
				) : (
					<Image
						src={`${BASE_URL}${post.post_image}`}
						boxSize="70%"
						objectFit="cover"
						borderRadius="8px"
					/>
				)}

				<Text mt="20px" textAlign="justify" w="95%">
					{post.description}
				</Text>

				<HStack mt="15px">
					<Box>
						{liked ? (
							<FaHeart
								onClick={handleToggleLike}
								color="red"
								cursor="pointer"
								size="24px"
							/>
						) : (
							<FaRegHeart
								onClick={handleToggleLike}
								cursor="pointer"
								size="24px"
							/>
						)}
					</Box>
					<Text>{likeCount}</Text>
				</HStack>
			</VStack>
		</Flex>
	);
};

export default FullPost;
