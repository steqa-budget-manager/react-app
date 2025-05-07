import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./UpdateIncomeForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {MoneyInput} from "../../components/MoneyInput/MoneyInput.tsx";
import {descriptionValidator} from "../../validators/descriptionValidator.ts";
import {amountValidator} from "../../validators/amountValidator.ts";
import {DateInput} from "../../components/DateInput/DateInput.tsx";
import {dateValidator} from "../../validators/dateValidator.ts";
import {getAllAccounts} from "../../api/requests/accountRequests.ts";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {requiredValidator} from "../../validators/requiredValidator.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {UpdateTransaction} from "../../api/schemas/transaction/UpdateTransaction.ts";
import {updateTransaction} from "../../api/requests/transactionRequests.ts";

export interface UpdateIncomeFormProps {
	initialValues: TransactionResponse;
	onSubmit?: (newIncome: TransactionResponse) => void
	onError?: (error: string) => void
}

export const UpdateIncomeForm: FC<UpdateIncomeFormProps> = ({initialValues, onSubmit, onError}) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>(initialValues.description, descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(initialValues.amount, amountValidator);
	const [date, setDate, dateValid, dateEmpty, dateErrors] = useValidator<Date | null>(initialValues.date, dateValidator);
	const [accountId, setAccountId, accountIdValid, accountIdEmpty, accountIdErrors] = useValidator<number | null>(initialValues.accountId, requiredValidator);
	const [categoryId, setCategoryId, categoryIdValid, categoryIdEmpty, categoryIdErrors] = useValidator<number | null>(initialValues.categoryId, requiredValidator);

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories()
	)

	const [fetchUpdateTransaction, isUpdateTransactionLoading, updateTransactionError, resetUpdateTransactionError] = useHttpRequest(
		async (transaction: UpdateTransaction) => updateTransaction(initialValues.id, transaction)
	)

	const isValid = useMemo(() => {
		return (
			(
				!descriptionEmpty ||
				!amountEmpty ||
				!dateEmpty ||
				!accountIdEmpty ||
				!categoryIdEmpty
			) &&
			descriptionValid &&
			amountValid &&
			dateValid &&
			accountIdValid &&
			categoryIdValid
		);
	}, [
		descriptionEmpty, amountEmpty, dateEmpty, accountIdEmpty, categoryIdEmpty,
		descriptionValid, amountValid, dateValid, accountIdValid, categoryIdValid
	]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const transaction = {
			...(!descriptionEmpty && {description}),
			...(!amountEmpty && {amount}),
			...(!dateEmpty && {date}),
			...(!accountIdEmpty && {accountId}),
			...(!categoryIdEmpty && {categoryId})
		} as UpdateTransaction;

		await fetchUpdateTransaction(transaction)
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
		if (onError && updateTransactionError) {
			onError(updateTransactionError);
			resetUpdateTransactionError();
		}
	}, [updateTransactionError]);


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

			<DateInput placeholder="Дата" value={date} setValue={setDate}/>
			<InputError errors={dateErrors}/>

			<div className={classes.buttonGroup}>
				<Button
					accent
					type="submit"
					active={isValid && !isUpdateTransactionLoading}
				>
					{isUpdateTransactionLoading ? "Загрузка..." : "Обновить"}
				</Button>
			</div>
		</form>
	)
}