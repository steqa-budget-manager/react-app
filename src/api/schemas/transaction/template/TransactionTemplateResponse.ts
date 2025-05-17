import {TransactionType} from "../TransactionType.ts";

export interface TransactionTemplateResponse {
	id: number,
	type: TransactionType,
	amount: bigint,
	description: string,
	createdAt: Date,
	account: string,
	accountId: number,
	category: string,
	categoryId: number,
}
