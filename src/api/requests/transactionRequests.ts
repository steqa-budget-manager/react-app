import api from "../api.ts";
import {TransactionResponse} from "../schemas/transaction/TransactionResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {AddTransaction} from "../schemas/transaction/AddTransaction.ts";

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

export const addTransaction = async (
	transaction: AddTransaction
): Promise<TransactionResponse> => {
	const payload = {
		...transaction,
		date: transaction.date,
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
