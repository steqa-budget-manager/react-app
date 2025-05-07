import {FC, ReactNode, useCallback, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	isAccessTokenExpired,
	isRefreshTokenExpired,
	setTokens
} from "../utils/authUtils.ts";
import api from "../api/api.ts";
import {PLoading} from "../pages/Loading/PLoading.tsx";
import {refreshTokenRequest} from "../api/requests/authRequests.ts";

interface Props {
	children: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(true);

	const logout = useCallback(() => {
		clearTokens();
		setIsLogged(false);
	}, []);

	useEffect(() => {
		const initAuth = async () => {
			const access = getAccessToken();
			const refresh = getRefreshToken();

			if (!access || isAccessTokenExpired()) {
				if (refresh && !isRefreshTokenExpired()) {
					try {
						const response = await refreshTokenRequest(refresh);
						setTokens(response.access, response.refresh);
						setIsLogged(true);
					} catch {
						logout();
					}
				} else {
					logout();
				}
			} else {
				setIsLogged(true);
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	useEffect(() => {
		const interceptor = api.interceptors.response.use(
			r => r,
			err => {
				if (err.response?.status === 401) {
					logout();
				}
				return Promise.reject(err);
			}
		);
		return () => {
			api.interceptors.response.eject(interceptor);
		};
	}, []);

	if (loading) {
		return <PLoading/>;
	}

	return (
		<AuthContext.Provider value={{isLogged, setIsLogged, logout}}>
			{children}
		</AuthContext.Provider>
	);
};
