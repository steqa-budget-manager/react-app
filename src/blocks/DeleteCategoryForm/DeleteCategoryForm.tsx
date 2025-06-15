import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {FC, useEffect, useState} from "react";
import classes from "./DeleteCategoryForm.module.css";
import {Button} from "../../components/Button/Button.tsx";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {UpdateCategory} from "../../api/schemas/category/UpdateCategory.ts";
import {deleteCategory, updateCategory} from "../../api/requests/categoryRequests.ts";

interface DeleteCategoryFormProps {
	category: CategoryResponse;
	onSubmit?: () => void
	onError?: (error: string) => void
}

export const DeleteCategoryForm: FC<DeleteCategoryFormProps> = ({category, onSubmit, onError}) => {
	const [offerHide, setOfferHide] = useState(false);

	const [fetchDeleteCategory, isDeleteCategoryLoading, deleteCategoryError, resetDeleteCategoryError] = useHttpRequest(
		async () => deleteCategory(category.id),
	);

	const [fetchUpdateCategory, isUpdateCategoryLoading, updateCategoryError, resetUpdateCategoryError] = useHttpRequest(
		async (data: UpdateCategory) => updateCategory(category.id, data)
	)

	const onDelete = async () => {
		await fetchDeleteCategory()
			.then(() => {
				if (onSubmit) onSubmit();
			})
			.catch((e) => {
				const errorCode = e.response.data.code;
				if (errorCode && errorCode == "CONFLICT") {
					setOfferHide(true);
				}
			})
	};

	const onHide = async () => {
		const category = {visible: false} as UpdateCategory;
		await fetchUpdateCategory(category)
			.then(() => {
				if (onSubmit) onSubmit();
			});
	};

	useEffect(() => {
		if (onError && deleteCategoryError) {
			onError(deleteCategoryError);
			resetDeleteCategoryError();
		}
	}, [deleteCategoryError]);

	useEffect(() => {
		if (onError && updateCategoryError) {
			onError(updateCategoryError);
			resetUpdateCategoryError();
		}
	}, [updateCategoryError]);

	return (
		<>
			{offerHide ? (<>
				<p className={classes.center}><strong>
					Категория не может быть удалена, так как она используется в существующих транзакциях.
				</strong></p>
				<p className={classes.center}>
					Вы можете скрыть её из общего списка — она продолжит отображаться только в тех операциях, где уже была
					выбрана.
				</p>
				<Button
					expense
					onClick={onHide}
					active={!isUpdateCategoryLoading}
				>
					{isUpdateCategoryLoading ? "Загрузка..." : "Скрыть"}
				</Button>
			</>) : (<>
				<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить категорию?</p>
				<Button
					expense
					onClick={onDelete}
					active={!isDeleteCategoryLoading}
				>
					{isDeleteCategoryLoading ? "Загрузка..." : "Удалить"}
				</Button>
			</>)}
		</>
	)
}