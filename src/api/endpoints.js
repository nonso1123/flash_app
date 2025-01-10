import axios from "axios";
import { SERVER_URL } from "../constants/constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original_request = error.config;

		if (error.response?.status === 401 && !original_request._retry) {
			original_request._retry = true;
			try {
				await refresh_token();
				return api(original_request);
			} catch (refreshError) {
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
export const get_user_profile_data = async (username) => {
	const response = await api.get(`/user_data/${username}/`);
	return response.data;
};
export const refresh_token = async () => {
	const response = await api.post("/token/refresh/");
	return response.data;
};
export const login = async (username, password) => {
	const response = await api.post("/token/", {
		username: username,
		password: password,
	});
	return response.data;
};
export const register = async (
	username,
	password,
	email,
	firstName,
	lastName
) => {
	const response = await api.post("/register/", {
		username: username,
		password: password,
		email: email,
		first_name: firstName,
		last_name: lastName,
	});
	return response.data;
};
export const get_auth = async () => {
	const response = await api.get("/authenticated/");
	return response.data;
};

export const toggleFollow = async (username) => {
	const response = await api.post("/toggleFollow/", { username: username });
	return response.data;
};

export const get_users_posts = async (username) => {
	const response = await api.get(`/posts/${username}/`);
	return response.data;
};

export const toggleLike = async (id) => {
	const response = await api.post("/toggleLike/", { id: id });
	return response.data;
};
export const create_post = async (values) => {
	const response = await api.post("/create_post/", values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};
export const get_posts = async (num) => {
	const response = await api.get(`/get_posts/?page=${num}`);
	return response.data;
};
export const search_user = async (search) => {
	const response = await api.get(`/search_user/?query=${search}`);
	return response.data;
};
export const check_username = async (username) => {
	const response = await api.get(`/check-username?username=${username}`);
	return response.data;
};
export const logout = async () => {
	const response = await api.post("/logout/");
	return response.data;
};
export const update_user = async (username, values) => {
	const response = await api.patch(`/update_user/${username}/`, values, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};
export const get_post = async (id) => {
	const response = await api.get(`/update_post/${id}/`);
	return response.data;
};

// Update a post by ID
export const update_post = async (id, data) => {
	const response = await api.patch(`/update_post/${id}/`, data, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};
export const delete_post = async (id) => {
	const response = await api.delete(`/update_post/${id}/`);
	return response.data;
};
