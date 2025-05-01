import axios from "axios";
import {RefreshTokenResponse} from "../../schemas/auth/RefreshTokenResponse.ts";
import {URL} from "../../config.ts";

export const refreshTokenRequest = async (refreshToken: string): Promise<RefreshTokenResponse> => {
	const data = {
		refresh: refreshToken,
	}
	const response = await axios.post(
		URL + "/api/v1/auth/refresh",
		data
	)
	return response.data
}