import {useState} from "react";
import {ruLocale} from "../locale/ruLocale.ts";
import axios, {AxiosError} from "axios";

type UseHttpRequest<T extends unknown[], R> = [
	request: (...args: T) => Promise<R>,
	isLoading: boolean,
	error: string | null,
	resetError: () => void,
];

export const useHttpRequest = <T extends unknown[], R>(
	callback: (...args: T) => Promise<R>
): UseHttpRequest<T, R> => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const request = async (...args: T): Promise<R> => {
		try {
			setIsLoading(true);
			const response = await callback(...args);
			setError(null);
			return response;
		} catch (e) {
			const err = e as AxiosError<{ message?: string }>;

			if (axios.isAxiosError(err)) {
				const msg = err.response?.data?.message || "Unknown error";
				setError(ruLocale(msg));
			} else {
				setError(ruLocale("Unknown error"));
			}

			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const resetError = () => {
		setError(null)
	}

	return [request, isLoading, error, resetError];
};
