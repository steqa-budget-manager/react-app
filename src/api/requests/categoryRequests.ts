import api from "../api.ts";
import {CategoryResponse} from "../schemas/category/CategoryResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";
import {AddCategory} from "../schemas/category/AddCategory.ts";

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
		"/transactions/categories" + "?type=" + type,
	)
	return response.data.map((item: { createdAt: string }) => ({
		...item,
		createdAt: new Date(item.createdAt),
	}));
}