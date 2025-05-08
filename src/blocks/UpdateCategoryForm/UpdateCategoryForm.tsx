import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {nameValidator} from "../../validators/nameValidator.ts";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {UpdateCategory} from "../../api/schemas/category/UpdateCategory.ts";
import {updateCategory} from "../../api/requests/categoryRequests.ts";
import classes from "./UpdateCategoryForm.module.css"

export interface UpdateCategoryFormProps {
	initialValues: CategoryResponse
	onSubmit?: (newCategory: CategoryResponse) => void
	onError?: (error: string) => void
}

export const UpdateCategoryForm: FC<UpdateCategoryFormProps> = ({initialValues, onSubmit, onError}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>(initialValues.name, nameValidator);

	const [fetchUpdateCategory, isUpdateCategoryLoading, updateCategoryError, resetUpdateCategoryError] = useHttpRequest(
		async (category: UpdateCategory) => updateCategory(initialValues.id, category)
	)

	const isValid = useMemo(() => {
		return !nameEmpty && nameValid;
	}, [nameEmpty, nameValid]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const category = {
			...(!nameEmpty && {name}),
		} as UpdateCategory;

		await fetchUpdateCategory(category)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	useEffect(() => {
		if (onError && updateCategoryError) {
			onError(updateCategoryError);
			resetUpdateCategoryError();
		}
	}, [updateCategoryError]);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<Input placeholder="Название" value={name} setValue={setName}/>
			<InputError errors={nameErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isUpdateCategoryLoading}
			>
				{isUpdateCategoryLoading ? "Загрузка..." : "Обновить"}
			</Button>
		</form>
	)
}