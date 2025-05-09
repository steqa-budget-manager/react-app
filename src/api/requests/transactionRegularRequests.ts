import api from "../api.ts";
import {AddTransactionRegular} from "../schemas/transaction/regular/AddTransactionRegular.ts";
import {TransactionRegularResponse} from "../schemas/transaction/regular/TransactionRegularResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {UpdateTransactionRegular} from "../schemas/transaction/regular/UpdateTransactionRegular.ts";

export const addTransactionRegular = async (
	transactionRegular: AddTransactionRegular
): Promise<TransactionRegularResponse> => {
	const payload = {
		...transactionRegular,
		amount: Number(transactionRegular.amount)
	};
	const response = await api.post(
		"/transactions/regulars",
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const getAllTransactionRegulars = async (
	type: TransactionType
): Promise<TransactionRegularResponse[]> => {
	const response = await api.get(
		"/transactions/regulars" + "?type=" + type,
	)
	return response.data.map((item: { date: string, amount: number }) => ({
		...item,
		date: new Date(item.date),
		amount: BigInt(item.amount),
	}));
}

export const getTransactionRegularById = async (
	id: number
): Promise<TransactionRegularResponse> => {
	const response = await api.get(
		"/transactions/regulars/" + id,
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const updateTransactionRegular = async (
	id: number,
	transactionRegular: UpdateTransactionRegular,
): Promise<TransactionRegularResponse> => {
	const {amount, accountId, categoryId, description} = transactionRegular;
	const payload = {
		...(amount !== undefined && {amount: Number(amount)}),
		...(accountId !== undefined && {accountId}),
		...(categoryId !== undefined && {categoryId}),
		...(description !== undefined && {description}),
	};
	const response = await api.patch(
		"/transactions/regulars/" + id,
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}


export const deleteTransactionRegular = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/transactions/regulars/" + id,
	)
}