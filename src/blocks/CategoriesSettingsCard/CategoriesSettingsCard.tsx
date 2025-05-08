import {CardsMenu} from "../../components/CardsMenu/CardsMenu.tsx";
import {FC, useEffect, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {Controls} from "../../components/Controls/Controls.tsx";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";

export interface CategoriesSettingsCardProps {
	type: TransactionType;
	onError?: (error: string) => void;
	refreshTrigger?: number;
}

export const CategoriesSettingsCard: FC<CategoriesSettingsCardProps> = ({type, onError, refreshTrigger}) => {
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories(type)
	)

	useEffect(() => {
		if (onError && getCategoriesError) {
			onError(getCategoriesError);
			resetGetCategoriesError();
		}
	}, [getCategoriesError]);

	useEffect(() => {
		fetchGetCategories().then(setCategories);
	}, [refreshTrigger]);

	return (
		<>
			<CardsMenu header={type == TransactionType.INCOME ? "Категории доходов" : "Категории расходов"}>
				{categories.map((account) => (<>
					<small>{account.name}</small>
					<Controls
						onEdit={() => {
						}}
						onDelete={() => {
						}}
					/>
				</>))}
			</CardsMenu>
		</>
	)
}