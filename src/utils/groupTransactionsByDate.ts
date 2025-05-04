import {TransactionResponse} from "../api/schemas/transaction/TransactionResponse.ts";

export interface TransactionsGroup {
	key: string;
	date: Date;
	transactions: TransactionResponse[];
	total: bigint;
}

export function groupTransactionsByDate(
	transactions: TransactionResponse[]
): TransactionsGroup[] {
	return transactions.reduce<TransactionsGroup[]>((groups, transaction) => {
		const dateKey = transaction.date.toLocaleDateString();

		let group = groups.find((g) => g.key === dateKey);

		if (!group) {
			group = {key: dateKey, date: transaction.date, transactions: [], total: BigInt(0)};
			groups.push(group);
		}

		group.transactions.push(transaction);
		group.total += transaction.amount;

		return groups;
	}, []);
}