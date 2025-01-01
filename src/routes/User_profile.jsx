import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Image,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	get_user_profile_data,
	get_users_posts,
	toggleFollow,
} from "../api/endpoints";
import { BASE_URL } from "../constants/constants";
import Post from "../components/Post";
import { Link, Navigate } from "react-router-dom";

const User_profile = () => {
	const get_username_from_url = () => {
		const url_split = window.location.pathname.split("/");
		return url_split[url_split.length - 1];
	};
	const [username, setUsernme] = useState(get_username_from_url());
	// const username = JSON.parse(localStorage.getItem("userData"))["username"];
	return (
		<Flex w="100%" justifyContent="center">
			<VStack w="75%">
				<Box w="100%" mt="40px">
					<UserDetails username={username} />
				</Box>
				<Box w="100%" mt="50px">
					<UserPosts username={username} />
				</Box>
			</VStack>
		</Flex>
	);
};
export default User_profile;

const UserDetails = ({ username }) => {
	const [loading, setLoading] = useState(true);
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);
	const [isOurProfile, setIsOurProfile] = useState(false);
	const [following, setFollowing] = useState(false);
	// const username = JSON.parse(localStorage.getItem("userData"))["username"];
	const fetchData = async () => {
		try {
			const data = await get_user_profile_data(username);
			setBio(data.bio);
			setProfileImage(data.profile_image);
			setFollowerCount(data.follower_count);
			setFollowingCount(data.following_count);
			setIsOurProfile(data.is_our_profile);
			setFollowing(data.following);
		} catch {
			console.log("error");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const handleToggleFollow = async () => {
		const data = await toggleFollow(username);
		if (data.now_following) {
			setFollowerCount((curr) => curr + 1);
			setFollowing(true);
		} else {
			setFollowerCount((curr) => curr - 1);
			setFollowing(false);
		}
	};
	return (
		<VStack alignItems="start" w="100%" gap="40px">
			<Heading>@{username}</Heading>
			<HStack
				gap="40px"
				w="100%"
				flexDirection={{ base: "column", sm: "row" }} // Change direction based on screen size
				alignItems="center" // Ensure proper alignment for vertical layout
			>
				<Box
					boxSize="150px"
					border="2px solid"
					borderColor="gray.700"
					bg="white"
					borderRadius="full"
					overflow="hidden"
				>
					<Image
						src={loading ? "" : `${BASE_URL}${profileImage}`}
						boxSize="100%"
						objectFit="cover"
					/>
				</Box>
				<VStack gap="20px" alignItems="start" w={{ base: "100%", sm: "auto" }}>
					<HStack
						gap={{ base: "45px", sm: "40px" }}
						fontSize="18px"
						justifyContent={{ base: "center", sm: "space-between" }}
						w="100%"
					>
						<VStack>
							<Text>followers</Text>
							<Text>{loading ? "" : followerCount}</Text>
						</VStack>
						<VStack>
							<Text>following</Text>
							<Text>{loading ? "" : followingCount}</Text>
						</VStack>
					</HStack>

					{loading ? (
						<Spacer />
					) : isOurProfile ? (
						<Button
							w={{ base: "50%", sm: "100%" }}
							colorScheme="blue"
							mx="auto"
						>
							<Link to="/setting">Edit Profile</Link>
						</Button>
					) : (
						<Button w="100%" colorScheme="blue" onClick={handleToggleFollow}>
							{following ? "unfollow" : "follow"}
						</Button>
					)}
				</VStack>
			</HStack>
			<Text fontSize="18px">{loading ? "" : bio}</Text>
		</VStack>
	);
};

const UserPosts = ({ username }) => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		try {
			const posts = await get_users_posts(username);
			setPosts(posts);
			// localStorage.setItem("posts", JSON.stringify(posts.description));
		} catch {
			alert("error getting posts");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// window.scrollTo(0, 0);
		fetchPosts();
	}, []);
	return (
		<Flex w="100%" wrap="wrap" gap="20px" pb="50px">
			{loading ? (
				<Text>Loading...</Text>
			) : (
				posts.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						username={post.username}
						description={post.description}
						post_image={post.post_image}
						formatted_date={post.formatted_date}
						liked={post.liked}
						like_count={post.like_count}
					/>
				))
			)}
		</Flex>
	);
};
