import api from "../api.ts";
import {TransactionResponse} from "../schemas/transaction/TransactionResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";

export const getAllTransactions = async (type: TransactionType): Promise<TransactionResponse[]> => {
	const response = await api.get(
		"/transactions" + "?type=" + type,
	)
	return response.data.map((item: { date: string }) => ({
		...item,
		date: new Date(item.date),
	}));
}