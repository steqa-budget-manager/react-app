import axios, {AxiosError} from "axios";
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	isAccessTokenExpired,
	isRefreshTokenExpired,
	setTokens,
} from "../utils/authUtils.ts";
import {TokensResponse} from "./schemas/auth/TokensResponse.ts";
import {URL} from "./config.ts";
import {refreshTokenRequest} from "./requests/authRequests.ts";

const api = axios.create({
	baseURL: URL + "/api/v1",
});

let isRefreshing = false;


api.interceptors.request.use(
	async config => {
		let token = getAccessToken();

		if (isAccessTokenExpired()) {
			const refreshToken = getRefreshToken();

			if (!refreshToken || isRefreshTokenExpired()) {
				clearTokens();
				return Promise.reject(new axios.Cancel("Not Authenticated"));
			}

			if (!isRefreshing) {
				isRefreshing = true;
				try {
					const response: TokensResponse = await refreshTokenRequest(refreshToken);
					setTokens(response.access, response.refresh);
					token = response.access;
				} catch (err) {
					clearTokens();
					throw err as AxiosError;
				} finally {
					isRefreshing = false;
				}
			}
		}

		if (token && config.headers) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(e: AxiosError) => Promise.reject(e)
);

export default api;
