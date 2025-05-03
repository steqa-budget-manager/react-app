import api from "../api.ts";
import {AccountResponse} from "../schemas/account/AccountResponse.ts";

export const getAllAccounts = async (): Promise<AccountResponse[]> => {
	const response = await api.get(
		"/accounts",
	)
	return response.data;
}