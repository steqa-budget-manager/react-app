import api from "../api.ts";
import {CategoryResponse} from "../schemas/category/CategoryResponse.ts";

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
	const response = await api.get(
		"/transactions/categories",
	)
	return response.data;
}