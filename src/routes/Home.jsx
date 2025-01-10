import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { get_posts } from "../api/endpoints";
import Post from "../components/Post";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [checking, setChecking] = useState(null);
	const [nextPage, setNextPage] = useState(1);
	let isMounted = true;
	const fetchData = async () => {
		try {
			setChecking(true);
			const data = await get_posts(nextPage);
			// if (!isMounted) return; // Skip updates if unmounted
			setPosts([...posts, ...data.results]);
			setNextPage(data.next ? nextPage + 1 : null);
			setChecking(false);
		} catch {
			if (!isMounted) return; // Skip alert if unmounted
			alert("error getting posts");
		} finally {
			// if (!isMounted) return; // Skip loading state update if unmounted
			setLoading(false);
		}
	};

	useEffect(() => {
		isMounted = false; // Track if component is mounted
		fetchData();

		return () => {
			isMounted = false; // Mark as unmounted on cleanup
		};
	}, []);
	return (
		<Flex w="100%" justifyContent="center" pt="50px">
			<VStack alignItems="start" gap="30px" pb="50px">
				<Heading>Posts</Heading>
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
				{nextPage !== null && !loading && (
					<Button
						w="100%"
						colorScheme="blue"
						onClick={fetchData}
						isLoading={checking}
					>
						Load more
					</Button>
				)}
			</VStack>
		</Flex>
	);
};

export default Home;
