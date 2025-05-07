export interface UpdateTransfer {
	description?: string,
	amount?: bigint,
	date?: Date,
	fromAccountId?: number,
	toAccountId?: number,
}
