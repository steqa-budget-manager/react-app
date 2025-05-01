import React, {ReactNode, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {
	clearTokens,
	getAccessToken,
	getRefreshToken,
	isAccessTokenExpired,
	isRefreshTokenExpired,
	setTokens
} from "../utils/auth-utils";
import {refreshTokenRequest} from "../api/requests/auth/refreshTokenRequest";
import api from "../api/api.ts";
import {PLoading} from "../pages/Loading/PLoading.tsx";

interface Props {
	children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
	const [isLogged, setIsLogged] = useState(false);
	const [loading, setLoading] = useState(true);

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
						clearTokens();
						setIsLogged(false);
					}
				} else {
					clearTokens();
					setIsLogged(false);
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
					clearTokens();
					setIsLogged(false);
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
		<AuthContext.Provider value={{isLogged, setIsLogged}}>
			{children}
		</AuthContext.Provider>
	);
};
