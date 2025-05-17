import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./UpdateTransactionTemplateForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {MoneyInput} from "../../components/MoneyInput/MoneyInput.tsx";
import {descriptionValidator} from "../../validators/descriptionValidator.ts";
import {amountValidator} from "../../validators/amountValidator.ts";
import {getAllAccounts} from "../../api/requests/accountRequests.ts";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {requiredValidator} from "../../validators/requiredValidator.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {UpdateTransaction} from "../../api/schemas/transaction/UpdateTransaction.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TransactionTemplateResponse} from "../../api/schemas/transaction/template/TransactionTemplateResponse.ts";
import {updateTransactionTemplate} from "../../api/requests/transactionTemplateRequests.ts";

export interface UpdateTransactionTemplateFormProps {
	type: TransactionType
	initialValues: TransactionTemplateResponse
	onSubmit?: (newTransactionTemplate: TransactionTemplateResponse) => void
	onError?: (error: string) => void
}

export const UpdateTransactionTemplateForm: FC<UpdateTransactionTemplateFormProps> = (
	{
		type,
		initialValues,
		onSubmit,
		onError
	}
) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>(initialValues.description, descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(initialValues.amount, amountValidator);
	const [accountId, setAccountId, accountIdValid, accountIdEmpty, accountIdErrors] = useValidator<number | null>(initialValues.accountId, requiredValidator);
	const [categoryId, setCategoryId, categoryIdValid, categoryIdEmpty, categoryIdErrors] = useValidator<number | null>(initialValues.categoryId, requiredValidator);

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories(type)
	)

	const [fetchUpdateTransactionTemplate, isUpdateTransactionTemplateLoading, updateTransactionTemplateError, resetUpdateTransactionTemplateError] = useHttpRequest(
		async (transactionTemplate: UpdateTransaction) => updateTransactionTemplate(initialValues.id, transactionTemplate)
	)

	const isValid = useMemo(() => {
		return (
			(
				!descriptionEmpty ||
				!amountEmpty ||
				!accountIdEmpty ||
				!categoryIdEmpty
			) &&
			descriptionValid &&
			amountValid &&
			accountIdValid &&
			categoryIdValid
		);
	}, [
		descriptionEmpty, amountEmpty, accountIdEmpty, categoryIdEmpty,
		descriptionValid, amountValid, accountIdValid, categoryIdValid
	]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const transaction = {
			...(!amountEmpty && {amount}),
			...(!descriptionEmpty && {description}),
			...(!accountIdEmpty && {accountId}),
			...(!categoryIdEmpty && {categoryId})
		} as UpdateTransaction;

		await fetchUpdateTransactionTemplate(transaction)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	useEffect(() => {
		if (onError && getAccountsError) {
			onError(getAccountsError);
			resetGetAccountsError();
		}
	}, [getAccountsError]);

	useEffect(() => {
		if (onError && getCategoriesError) {
			onError(getCategoriesError);
			resetGetCategoriesError();
		}
	}, [getCategoriesError]);

	useEffect(() => {
		if (onError && updateTransactionTemplateError) {
			onError(updateTransactionTemplateError);
			resetUpdateTransactionTemplateError();
		}
	}, [updateTransactionTemplateError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
		fetchGetCategories().then(setCategories);
	}, []);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<DropdownInput
				placeholder="Аккаунт"
				initSelected={initialValues.account}
				setValue={(value) => setAccountId(Number(value))}
			>
				{accounts.map((account, index) => (
					<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
				))}
			</DropdownInput>
			<InputError errors={accountIdErrors}/>

			<DropdownInput
				placeholder="Категория"
				initSelected={initialValues.category}
				setValue={(value) => setCategoryId(Number(value))}
			>
				{categories.map((category, index) => (
					<DropdownInputOption key={index} label={category.name} value={category.id.toString()}/>
				))}
			</DropdownInput>
			<InputError errors={categoryIdErrors}/>

			<MoneyInput placeholder="Сумма" value={amount} setValue={setAmount}/>
			<InputError errors={amountErrors}/>

			<Input placeholder="Описание" value={description} setValue={setDescription}/>
			<InputError errors={descriptionErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isUpdateTransactionTemplateLoading}
			>
				{isUpdateTransactionTemplateLoading ? "Загрузка..." : "Обновить"}
			</Button>
		</form>
	)
}