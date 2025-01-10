import { createContext, useContext, useEffect, useState } from "react";
import { get_auth, login } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(false);
	const [authLoading, setAuthLoading] = useState(true);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const check_auth = async () => {
		try {
			await get_auth();
			setAuth(true);
		} catch {
			setAuth(false);
		} finally {
			setAuthLoading(false);
		}
	};

	const auth_login = async (username, password) => {
		setLoading(true);
		const data = await login(username, password);
		if (data.success) {
			setLoading(false);
			setAuth(true);
			const userData = {
				username: data.user.username,
				bio: data.user.bio,
				email: data.user.email,
				first_name: data.user.first_name,
				last_name: data.user.last_name,
				profile_image: data.user.profile_image,
			};
			localStorage.setItem("userData", JSON.stringify(userData));
			navigate(`/${username}`);
		} else {
			setLoading(false);
			alert("Invalid username or password");
		}
	};
	useEffect(() => {
		check_auth();
	}, [window.location.pathname]);

	return (
		<AuthContext.Provider value={{ auth, authLoading, auth_login, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
