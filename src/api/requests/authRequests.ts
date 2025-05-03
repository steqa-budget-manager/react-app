import {TokensResponse} from "../schemas/auth/TokensResponse.ts";
import axios from "axios";
import {URL} from "../config.ts";

export const loginRequest = async (email: string, password: string): Promise<TokensResponse> => {
	const data = {
		email: email,
		password: password,
	}
	const response = await axios.post(
		URL + "/api/v1/auth/login",
		data
	)
	return response.data
}

export const refreshTokenRequest = async (refreshToken: string): Promise<TokensResponse> => {
	const data = {
		refresh: refreshToken,
	}
	const response = await axios.post(
		URL + "/api/v1/auth/refresh",
		data
	)
	return response.data
}

export const signupRequest = async (email: string, password: string): Promise<TokensResponse> => {
	const data = {
		email: email,
		password: password,
	}
	const response = await axios.post(
		URL + "/api/v1/auth/signup",
		data
	)
	return response.data
}