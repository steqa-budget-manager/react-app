import api from "../api.ts";
import {AddTransactionRegular} from "../schemas/transaction/regular/AddTransactionRegular.ts";
import {TransactionRegularResponse} from "../schemas/transaction/regular/TransactionRegularResponse.ts";

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