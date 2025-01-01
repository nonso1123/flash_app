import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline, IoSearch } from "react-icons/io5";
import { IoMdAddCircleOutline, IoMdSettings } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import icon from "../assets/icons8-storyfire.svg";

const Navbar = () => {
	const nav = useNavigate();
	const handleNavigate = (route) => {
		nav(`/${route}`);
	};
	const handleNavigateUser = () => {
		const username = JSON.parse(localStorage.getItem("userData"))["username"];
		sessionStorage.removeItem("scrollPosition");
		nav(`/${username}`);

		window.location.reload();
	};
	const handleNavigateHome = () => {
		sessionStorage.removeItem("scrollPosition");
		nav("/");
	};
	return (
		<Flex
			w="100vw"
			h="90px"
			bg="blue.600"
			justifyContent="center"
			alignItems="center"
		>
			<HStack
				w="90%"
				justifyContent="space-between"
				color="white"
				sx={{
					"@media (max-width: 480px)": {
						flexDirection: "column",
					},
				}}
			>
				<HStack>
					<Image boxSize="20%" src={icon} />
					<Text
						fontSize="24px"
						bgGradient="linear( palegreen, white)"
						bgClip="text"
						fontFamily="'Playfair Display', serif"
						fontStyle="italic"
					>
						Flashapp
					</Text>
				</HStack>
				<HStack
					gap="35px"
					sx={{
						"@media (min-width: 400px)": {
							gap: "50px",
						},
						"@media (min-width: 481px)": {
							gap: "25px",
						},
					}}
				>
					<Text cursor="pointer" onClick={handleNavigateUser}>
						<IoPersonOutline size="22px" />
					</Text>
					<Text cursor="pointer" onClick={() => handleNavigate("create_post")}>
						<IoMdAddCircleOutline size="22px" />
					</Text>
					<Text cursor="pointer" onClick={handleNavigateHome}>
						<FaHouse size="20px" />
					</Text>
					<Text cursor="pointer" onClick={() => handleNavigate("search")}>
						<IoSearch size="22px" />
					</Text>
					<Text cursor="pointer" onClick={() => handleNavigate("setting")}>
						<IoMdSettings size="22px" />
					</Text>
				</HStack>
			</HStack>
		</Flex>
	);
};

export default Navbar;
