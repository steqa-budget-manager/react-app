import api from "../api.ts";
import {CategoryResponse} from "../schemas/category/CategoryResponse.ts";
import {TransactionType} from "../schemas/transaction/TransactionType.ts";

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