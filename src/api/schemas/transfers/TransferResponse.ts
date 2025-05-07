export interface TransferResponse {
	id: number,
	amount: bigint,
	description: string,
	date: Date,
	fromAccountId: number,
	fromAccount: string,
	toAccountId: number,
	toAccount: string,
}
