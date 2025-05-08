import api from "../api.ts";
import {CategoryResponse} from "../schemas/category/CategoryResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {AddCategory} from "../schemas/category/AddCategory.ts";
import {UpdateCategory} from "../schemas/category/UpdateCategory.ts";

export const addCategory = async (
	category: AddCategory,
): Promise<CategoryResponse> => {
	const response = await api.post(
		"/transactions/categories",
		category,
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
	};
}

export const getAllCategories = async (
	type: TransactionType
): Promise<CategoryResponse[]> => {
	const response = await api.get(
		"/transactions/categories" + "?visible=" + true + "&type=" + type,
	)
	return response.data.map((item: { createdAt: string }) => ({
		...item,
		createdAt: new Date(item.createdAt),
	}));
}

export const updateCategory = async (
	id: number,
	category: UpdateCategory,
): Promise<CategoryResponse> => {
	const {type, name, visible} = category;
	const payload = {
		...(type !== undefined && {type}),
		...(name !== undefined && {name}),
		...(visible !== undefined && {visible}),
	};
	const response = await api.patch(
		"/transactions/categories/" + id,
		payload
	)
	return {
		...response.data,
		createdAt: new Date(response.data.createdAt),
	};
}

export const deleteCategory = async (
	id: number
): Promise<void> => {
	await api.delete(
		"/transactions/categories/" + id,
	)
}