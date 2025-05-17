import api from "../api.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {TransactionTemplateResponse} from "../schemas/transaction/template/TransactionTemplateResponse.ts";
import {AddTransactionTemplate} from "../schemas/transaction/template/AddTransactionTemplate.ts";
import {UpdateTransactionTemplate} from "../schemas/transaction/template/UpdateTransactionTemplate.ts";

export const addTransactionTemplate = async (
	transactionTemplate: AddTransactionTemplate
): Promise<TransactionTemplateResponse> => {
	const payload = {
		...transactionTemplate,
		amount: Number(transactionTemplate.amount)
	};
	const response = await api.post(
		"/transactions/templates",
		payload
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
		amount: BigInt(response.data.amount),
	};
}

export const getAllTransactionTemplates = async (
	type: TransactionType
): Promise<TransactionTemplateResponse[]> => {
	const response = await api.get(
		"/transactions/templates" + "?type=" + type,
	)
	return response.data.map((item: { createdAt: string, amount: number }) => ({
		...item,
		createdAt: new Date(item.createdAt),
		amount: BigInt(item.amount),
	}));
}

export const getTransactionTemplateById = async (
	id: number
): Promise<TransactionTemplateResponse> => {
	const response = await api.get(
		"/transactions/templates/" + id,
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
		amount: BigInt(response.data.amount),
	};
}

export const updateTransactionTemplate = async (
	id: number,
	transactionTemplate: UpdateTransactionTemplate,
): Promise<TransactionTemplateResponse> => {
	const {amount, description, accountId, categoryId} = transactionTemplate;
	const payload = {
		...(amount !== undefined && {amount: Number(amount)}),
		...(description !== undefined && {description}),
		...(accountId !== undefined && {accountId}),
		...(categoryId !== undefined && {categoryId}),
	};
	const response = await api.patch(
		"/transactions/templates/" + id,
		payload
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
		amount: BigInt(response.data.amount),
	};
}

export const deleteTransactionTemplate = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/transactions/templates/" + id,
	)
}