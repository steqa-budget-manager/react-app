import {jwtDecode} from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';

export const getAccessToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const getRefreshToken = () => {
	return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export const setTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export const clearTokens = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);
}

const isTokenExpired = (token: string | null): boolean => {
	if (!token) return true;
	try {
		const {exp} = jwtDecode(token);
		return Date.now() >= exp! * 1000;
	} catch {
		return true;
	}
}

export const isAccessTokenExpired = () => {
	return isTokenExpired(getAccessToken());
}

export const isRefreshTokenExpired = () => {
	return isTokenExpired(getRefreshToken());
}
