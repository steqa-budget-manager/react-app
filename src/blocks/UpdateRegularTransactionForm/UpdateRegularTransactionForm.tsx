import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./UpdateRegularTransactionForm.module.css";
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
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {updateTransactionRegular} from "../../api/requests/transactionRegularRequests.ts";
import {TransactionRegularResponse} from "../../api/schemas/transaction/regular/TransactionRegularResponse.ts";
import {UpdateTransactionRegular} from "../../api/schemas/transaction/regular/UpdateTransactionRegular.ts";

export interface UpdateRegularTransactionFormProps {
	type: TransactionType
	initialValues: TransactionRegularResponse
	onSubmit?: (newTransactionRegular: TransactionRegularResponse) => void
	onError?: (error: string) => void
}

export const UpdateRegularTransactionForm: FC<UpdateRegularTransactionFormProps> = (
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

	const [fetchUpdateTransactionRegular, isUpdateTransactionRegularLoading, updateTransactionRegularError, resetUpdateTransactionRegularError] = useHttpRequest(
		async (transactionRegular: UpdateTransactionRegular) => updateTransactionRegular(initialValues.id, transactionRegular)
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

		const transactionRegular = {
			...(!descriptionEmpty && {description}),
			...(!amountEmpty && {amount}),
			...(!accountIdEmpty && {accountId}),
			...(!categoryIdEmpty && {categoryId})
		} as UpdateTransactionRegular;

		await fetchUpdateTransactionRegular(transactionRegular)
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
		if (onError && updateTransactionRegularError) {
			onError(updateTransactionRegularError);
			resetUpdateTransactionRegularError();
		}
	}, [updateTransactionRegularError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
		fetchGetCategories().then(setCategories);
		console.log(initialValues.amount)
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
				{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
				type="submit"
				active={isValid && !isUpdateTransactionRegularLoading}
			>
				{isUpdateTransactionRegularLoading ? "Загрузка..." : "Добавить"}
			</Button>
		</form>
	)
}