import {TransactionType} from "./TransactionType.ts";

export interface TransactionResponse {
	id: number,
	type: TransactionType,
	amount: number,
	description: string,
	date: Date,
	account: string,
	accountId: number,
	category: string,
	categoryId: number
}
