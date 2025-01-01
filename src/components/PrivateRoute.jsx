import React, { useContext } from "react";
import { AuthContext } from "../contexts/useAuth";
import { Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { auth, authLoading } = useContext(AuthContext);

	if (authLoading) {
		return <Text textAlign="center">Loading...</Text>; // Show loading while auth is being checked
	}

	if (auth) {
		return children; // Render the protected content if authenticated
	} else {
		return <Navigate to="/login" />; // Redirect to login if not authenticated
	}
};

export default PrivateRoute;
