import axios from "axios";
import {TokensResponse} from "../../schemas/auth/TokensResponse.ts";
import {URL} from "../../config.ts";

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