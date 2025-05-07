import {TransactionResponse} from "../api/schemas/transaction/TransactionResponse.ts";
import {TransferResponse} from "../api/schemas/transfers/TransferResponse.ts";

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

export interface TransfersGroup {
	key: string;
	date: Date;
	transfers: TransferResponse[];
	total: bigint;
}

export function groupTransfersByDate(
	transfers: TransferResponse[],
): TransfersGroup[] {
	return transfers.reduce<TransfersGroup[]>((groups, transfer) => {
		const dateKey = transfer.date.toLocaleDateString();

		let group = groups.find((g) => g.key === dateKey);

		if (!group) {
			group = {key: dateKey, date: transfer.date, transfers: [], total: BigInt(0)};
			groups.push(group);
		}

		group.transfers.push(transfer);
		group.total += transfer.amount;

		return groups;
	}, []);
}
