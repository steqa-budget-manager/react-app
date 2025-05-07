export interface AddTransfer {
	description?: string,
	amount: bigint,
	date: Date,
	fromAccountId: number,
	toAccountId: number,
}
