import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User_profile from "./routes/User_profile";
import Layout from "./components/Layout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { AuthProvider } from "./contexts/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./routes/CreatePost";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Setting from "./routes/Setting";
import Update from "./routes/Update";
import FullPost from "./routes/FullPost";

const App = () => {
	return (
		<ChakraProvider>
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							element={
								<Layout>
									<PrivateRoute>
										<User_profile />
									</PrivateRoute>
								</Layout>
							}
							path="/:username"
						/>
						<Route element={<Login />} path="/login" />
						<Route
							element={
								<Layout>
									<Register />
								</Layout>
							}
							path="/register"
						/>
						<Route
							element={
								<PrivateRoute>
									<Layout>
										<Home />
									</Layout>
								</PrivateRoute>
							}
							path="/"
						/>
						<Route
							element={
								<PrivateRoute>
									<Layout>
										<CreatePost />
									</Layout>
								</PrivateRoute>
							}
							path="/create_post"
						/>
						<Route
							element={
								<PrivateRoute>
									<Layout>
										<Search />
									</Layout>
								</PrivateRoute>
							}
							path="/search"
						/>
						<Route
							path="/update_post/:id"
							element={
								<PrivateRoute>
									<Layout>
										<Update />
									</Layout>
								</PrivateRoute>
							}
						/>
						<Route
							element={
								<PrivateRoute>
									<Layout>
										<Setting />
									</Layout>
								</PrivateRoute>
							}
							path="/setting"
						/>
						<Route
							element={
								<PrivateRoute>
									<Layout>
										<FullPost />
									</Layout>
								</PrivateRoute>
							}
							path="/post/:id"
						/>
					</Routes>
				</AuthProvider>
			</Router>
		</ChakraProvider>
	);
};

export default App;
