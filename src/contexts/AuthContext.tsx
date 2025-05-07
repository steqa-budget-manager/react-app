import {createContext} from "react";

interface AuthContextType {
	isLogged: boolean;
	setIsLogged: (isLogged: boolean) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
	{
		isLogged: false,
		setIsLogged: (): void => {
		},
		logout: () => {
		}
	}
);