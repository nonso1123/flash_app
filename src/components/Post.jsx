import {
	Box,
	Flex,
	HStack,
	Text,
	VStack,
	Button,
	Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { delete_post, toggleLike, update_post } from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constants";

const Post = ({
	id,
	username,
	formatted_date,
	description,
	post_image,
	liked,
	like_count,
}) => {
	const [clientLiked, setClientLiked] = useState(liked);
	const [clientLikeCount, setClientLikeCount] = useState(like_count);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("userData"))["username"];

	// Navigate to update page
	const handleNavigate = () => {
		navigate(`/update_post/${id}`);
	};
	// Navigate to full post page
	const handleViewPost = () => {
		sessionStorage.setItem("scrollPosition", window.scrollY);
		const stateData = { username: username, formatted_date: formatted_date }; // Your state data

		navigate(`/post/${id}`, { state: stateData });
	};
	useEffect(() => {
		// Restore the saved scroll position
		const savedScrollPosition = sessionStorage.getItem("scrollPosition");
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}

		// Clear scroll position on page reload
		const handlePageReload = () => {
			sessionStorage.removeItem("scrollPosition");
		};

		window.addEventListener("beforeunload", handlePageReload);

		// Cleanup the event listener
		return () => {
			window.removeEventListener("beforeunload", handlePageReload);
		};
	}, []);
	// Handle toggle like
	const handleToggleLike = async () => {
		const data = await toggleLike(id);
		if (data.now_liked) {
			setClientLiked(true);
			setClientLikeCount((curr) => curr + 1);
		} else {
			setClientLiked(false);
			setClientLikeCount((curr) => curr - 1);
		}
	};

	// Handle delete post
	const handleDelete = async () => {
		try {
			if (window.confirm("Are you sure you want to delete this post?")) {
				await delete_post(id); // Call the delete API
				alert("Post deleted successfully");
				window.location.reload(); // Redirect after deletion
			}
		} catch (error) {
			alert("Error deleting post");
		}
	};

	return (
		<VStack
			w="325px"
			h="400px"
			border="1px solid"
			borderRadius="8px"
			borderColor="gray.400"
		>
			<HStack
				w="100%"
				borderBottom="1px solid"
				borderColor="gray.300"
				p="0 20px"
				bg="gray.50"
				borderRadius="8px 8px 0 0"
				flex="2"
				justifyContent="space-between"
			>
				<Text>{username}</Text>
				{user === username && window.location.pathname !== "/" ? (
					<HStack>
						<Text onClick={handleNavigate} cursor="pointer" color="blue.500">
							Edit
						</Text>
						<Text onClick={handleDelete} cursor="pointer" color="red.500">
							Delete
						</Text>
					</HStack>
				) : null}
			</HStack>
			{post_image === null ? (
				<></>
			) : (
				<Flex
					flex="2"
					w="100%"
					justifyContent="center"
					h="100%"
					alignItems="start"
					onClick={handleViewPost}
				>
					<Box
						boxSize="250px"
						// border="2px solid"
						borderColor="none"
						bg="white"
						// borderRadius="full"
						overflow="hidden"
						w="95%"
					>
						<Image
							src={`${BASE_URL}${post_image}`}
							boxSize="100%"
							objectFit="cover"
						/>
					</Box>
				</Flex>
			)}

			<Flex
				flex={post_image === null ? "12" : "1"}
				w="100%"
				justifyContent="center"
				h="100%"
				alignItems="center"
			>
				<Text textAlign="justify" w="90%">
					{description.length > (post_image === null ? 400 : 40) ? (
						<>
							{description.substring(0, post_image === null ? 400 : 40)}...{" "}
							<Text color="blue.500" cursor="pointer" onClick={handleViewPost}>
								Read More
							</Text>
						</>
					) : (
						description
					)}
				</Text>
			</Flex>
			<Flex
				w="100%"
				justifyContent="center"
				alignItems="center"
				borderTop="1px solid"
				bg="gray.50"
				borderRadius="0 0 8px 8px"
				borderColor="gray.300"
				flex="2"
			>
				<HStack w="90%" justifyContent="space-between">
					<HStack>
						<Box>
							{clientLiked ? (
								<FaHeart
									onClick={handleToggleLike}
									color="red"
									cursor="pointer"
								/>
							) : (
								<FaRegHeart onClick={handleToggleLike} cursor="pointer" />
							)}
						</Box>
						<Text>{clientLikeCount}</Text>
					</HStack>
					<Text>{formatted_date}</Text>
				</HStack>
			</Flex>
		</VStack>
	);
};

export default Post;
