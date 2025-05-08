import api from "../api.ts";
import {AccountResponse} from "../schemas/account/AccountResponse.ts";
import {UpdateAccount} from "../schemas/account/UpdateAccount.ts";
import {AddAccount} from "../schemas/account/AddAccount.ts";

export const addAccount = async (
	account: AddAccount,
): Promise<AccountResponse> => {
	const response = await api.post(
		"/accounts",
		account,
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
	};
}

export const getAllAccounts = async (): Promise<AccountResponse[]> => {
	const response = await api.get(
		"/accounts" + "?visible=" + true,
	)
	return response.data.map((item: { createdAt: string }) => ({
		...item,
		createdAt: new Date(item.createdAt),
	}));
}

export const updateAccount = async (
	id: number,
	account: UpdateAccount,
): Promise<AccountResponse> => {
	const {name, visible} = account;
	const payload = {
		...(name !== undefined && {name}),
		...(visible !== undefined && {visible}),
	};
	const response = await api.patch(
		"/accounts/" + id,
		payload
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
	};
}

export const deleteAccount = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/accounts/" + id,
	)
}