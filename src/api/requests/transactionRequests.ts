import api from "../api.ts";
import {TransactionResponse} from "../schemas/transaction/TransactionResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {AddTransaction} from "../schemas/transaction/AddTransaction.ts";
import {UpdateTransaction} from "../schemas/transaction/UpdateTransaction.ts";

export const addTransaction = async (
	transaction: AddTransaction
): Promise<TransactionResponse> => {
	const payload = {
		...transaction,
		amount: Number(transaction.amount)
	};
	const response = await api.post(
		"/transactions",
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const getAllTransactions = async (
	type: TransactionType
): Promise<TransactionResponse[]> => {
	const response = await api.get(
		"/transactions" + "?type=" + type,
	)
	return response.data.map((item: { date: string, amount: number }) => ({
		...item,
		date: new Date(item.date),
		amount: BigInt(item.amount),
	}));
}

export const getTransactionById = async (
	id: number
): Promise<TransactionResponse> => {
	const response = await api.get(
		"/transactions/" + id,
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const updateTransaction = async (
	id: number,
	transaction: UpdateTransaction,
): Promise<TransactionResponse> => {
	const {type, amount, date, accountId, categoryId, description} = transaction;
	const payload = {
		...(type !== undefined && {type}),
		...(amount !== undefined && {amount: Number(amount)}),
		...(date !== undefined && {date}),
		...(accountId !== undefined && {accountId}),
		...(categoryId !== undefined && {categoryId}),
		...(description !== undefined && {description}),
	};

	const response = await api.patch(
		"/transactions/" + id,
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const deleteTransaction = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/transactions/" + id,
	)
}