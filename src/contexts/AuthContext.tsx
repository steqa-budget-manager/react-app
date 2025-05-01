import {createContext} from "react";

interface AuthContextType {
	isLogged: boolean;
	setIsLogged: (isLogged: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(
	{
		isLogged: false,
		setIsLogged: (isLogged: boolean): void => {
		}
	}
);