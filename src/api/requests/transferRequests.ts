import api from "../api.ts";
import {TransferResponse} from "../schemas/transfers/TransferResponse.ts";
import {AddTransfer} from "../schemas/transfers/AddTransfer.ts";
import {UpdateTransfer} from "../schemas/transfers/UpdateTransfer.ts";

export const addTransfer = async (
	transfer: AddTransfer
): Promise<TransferResponse> => {
	const payload = {
		...transfer,
		amount: Number(transfer.amount)
	};
	const response = await api.post(
		"/transfers",
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const getAllTransfers = async (): Promise<TransferResponse[]> => {
	const response = await api.get(
		"/transfers",
	)
	return response.data.map((item: { date: string, amount: number }) => ({
		...item,
		date: new Date(item.date),
		amount: BigInt(item.amount),
	}));
}

export const getTransferById = async (
	id: number
): Promise<TransferResponse> => {
	const response = await api.get(
		"/transfers/" + id,
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const updateTransfer = async (
	id: number,
	transfer: UpdateTransfer,
): Promise<TransferResponse> => {
	const {description, amount, date, fromAccountId, toAccountId} = transfer;
	const payload = {
		...(description !== undefined && {description}),
		...(amount !== undefined && {amount: Number(amount)}),
		...(date !== undefined && {date}),
		...(fromAccountId !== undefined && {fromAccountId}),
		...(toAccountId !== undefined && {toAccountId}),
	};
	const response = await api.patch(
		"/transfers/" + id,
		payload
	)
	return {
		...response.data,
		date: new Date(response.data.date),
		amount: BigInt(response.data.amount),
	};
}

export const deleteTransfer = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/transfers/" + id,
	)
}