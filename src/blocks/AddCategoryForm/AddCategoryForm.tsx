import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./AddCategoryForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {nameValidator} from "../../validators/nameValidator.ts";
import {AddCategory} from "../../api/schemas/category/AddCategory.ts";
import {addCategory} from "../../api/requests/categoryRequests.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {requiredValidator} from "../../validators/requiredValidator.ts";
import {ruLocale} from "../../locale/ruLocale.ts";

export interface AddCategoryFormProps {
	onSubmit?: (newAccount: AccountResponse) => void
	onError?: (error: string) => void
}

export const AddCategoryForm: FC<AddCategoryFormProps> = ({onSubmit, onError}) => {
	const [type, setType, typeValid, typeEmpty, typeErrors] = useValidator<string | null>("", requiredValidator);
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>("", nameValidator);

	const [fetchAddCategory, isAddCategoryLoading, addCategoryError, resetAddCategoryError] = useHttpRequest(
		async (category: AddCategory) => addCategory(category)
	)

	const isValid = useMemo(() => {
		return (
			!nameEmpty &&
			!typeEmpty &&
			nameValid &&
			typeValid
		);
	}, [nameEmpty, typeEmpty, nameValid, typeValid]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const category: AddCategory = {
			name: name,
			type: type!,
		};
		await fetchAddCategory(category)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	useEffect(() => {
		if (onError && addCategoryError) {
			onError(addCategoryError);
			resetAddCategoryError();
		}
	}, [addCategoryError]);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<DropdownInput
				placeholder="Вид категории"
				setValue={(value) => setType(value)}
			>
				{Object.values(TransactionType).map((type, index) => (
					<DropdownInputOption key={index} label={ruLocale(type)} value={type}/>
				))}
			</DropdownInput>
			<InputError errors={typeErrors}/>

			<Input placeholder="Название" value={name} setValue={setName}/>
			<InputError errors={nameErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isAddCategoryLoading}
			>
				{isAddCategoryLoading ? "Загрузка..." : "Добавить"}
			</Button>
		</form>
	)
}