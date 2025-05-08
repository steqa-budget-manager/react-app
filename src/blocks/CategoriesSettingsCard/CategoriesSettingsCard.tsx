import {CardsMenu} from "../../components/CardsMenu/CardsMenu.tsx";
import {FC, useEffect, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {Controls} from "../../components/Controls/Controls.tsx";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {Modal} from "../../components/Modal/Modal.tsx";
import {UpdateCategoryForm} from "../UpdateCategoryForm/UpdateCategoryForm.tsx";
import {DeleteCategoryForm} from "../DeleteCategoryForm/DeleteCategoryForm.tsx";

export interface CategoriesSettingsCardProps {
	type: TransactionType;
	onError?: (error: string) => void;
	refreshTrigger?: number;
}

export const CategoriesSettingsCard: FC<CategoriesSettingsCardProps> = ({type, onError, refreshTrigger}) => {
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [selectedCategory, setSelectedCategory] = useState<CategoryResponse>();

	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories(type)
	)

	const handleDeleteCategory = () => {
		if (!selectedCategory) return;
		setCategories(prev =>
			prev.filter(category => category.id !== selectedCategory.id)
		);
		setShowDeleteModal(false);
	}

	const handleUpdateCategory = (newCategory: CategoryResponse) => {
		if (!selectedCategory) return;
		setCategories(prev =>
			prev.map(category => category.id === newCategory.id ? newCategory : category)
		);
		setShowUpdateModal(false);
	}

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
				{categories.map((category) => (<>
					<small>{category.name}</small>
					<Controls
						onEdit={() => {
							setSelectedCategory(category);
							setShowUpdateModal(true);
						}}
						onDelete={() => {
							setSelectedCategory(category);
							setShowDeleteModal(true);
						}}
					/>
				</>))}
			</CardsMenu>

			{showUpdateModal && selectedCategory && (
				<Modal onClose={() => setShowUpdateModal(false)}>
					<UpdateCategoryForm
						initialValues={selectedCategory}
						onError={onError}
						onSubmit={(newCategory) => handleUpdateCategory(newCategory)}
					/>
				</Modal>
			)}

			{showDeleteModal && selectedCategory && (
				<Modal onClose={() => setShowDeleteModal(false)}>
					<DeleteCategoryForm
						category={selectedCategory}
						onError={onError}
						onSubmit={() => handleDeleteCategory()}
					/>
				</Modal>
			)}
		</>
	)
}