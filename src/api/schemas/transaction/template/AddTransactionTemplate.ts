import {TransactionType} from "../TransactionType.ts";

export interface AddTransactionTemplate {
	type: TransactionType,
	amount: bigint,
	accountId: number,
	categoryId: number,
	description?: string,
}
