import {TransactionType} from "./TransactionType.ts";

export interface AddTransaction {
	type: TransactionType,
	amount: bigint,
	date: Date,
	accountId: number,
	categoryId: number,
	description?: string,
}
