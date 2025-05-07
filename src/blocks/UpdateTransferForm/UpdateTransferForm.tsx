import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./UpdateTransferForm.module.css";
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
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {UpdateTransfer} from "../../api/schemas/transfers/UpdateTransfer.ts";
import {updateTransfer} from "../../api/requests/transferRequests.ts";

export interface UpdateTransferFormProps {
	initialValues: TransferResponse
	onSubmit?: (newTransfer: TransferResponse) => void
	onError?: (error: string) => void
}

export const UpdateTransferForm: FC<UpdateTransferFormProps> = ({initialValues, onSubmit, onError}) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>(initialValues.description, descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(initialValues.amount, amountValidator);
	const [date, setDate, dateValid, dateEmpty, dateErrors] = useValidator<Date | null>(initialValues.date, dateValidator);
	const [fromAccountId, setFromAccountId, fromAccountIdValid, fromAccountIdEmpty, fromAccountIdErrors] = useValidator<number | null>(initialValues.fromAccountId, requiredValidator);
	const [toAccountId, setToAccountId, toAccountIdValid, toAccountIdEmpty, toAccountIdErrors] = useValidator<number | null>(initialValues.toAccountId, requiredValidator);

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchUpdateTransfer, isUpdateTransferLoading, updateTransferError, resetUpdateTransferError] = useHttpRequest(
		async (transfer: UpdateTransfer) => updateTransfer(initialValues.id, transfer)
	)

	const isValid = useMemo(() => {
		return (
			(
				!descriptionEmpty ||
				!amountEmpty ||
				!dateEmpty ||
				!fromAccountIdEmpty ||
				!toAccountIdEmpty
			) &&
			descriptionValid &&
			amountValid &&
			dateValid &&
			fromAccountIdValid &&
			toAccountIdValid
		);
	}, [
		descriptionEmpty, amountEmpty, dateEmpty, fromAccountIdEmpty, toAccountIdEmpty,
		descriptionValid, amountValid, dateValid, fromAccountIdValid, toAccountIdValid
	]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const transfer = {
			...(!descriptionEmpty && {description}),
			...(!amountEmpty && {amount}),
			...(!dateEmpty && {date}),
			...(!fromAccountIdEmpty && {fromAccountId: fromAccountId}),
			...(!toAccountIdEmpty && {toAccountId: toAccountId})
		} as UpdateTransfer;

		await fetchUpdateTransfer(transfer)
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
		if (onError && updateTransferError) {
			onError(updateTransferError);
			resetUpdateTransferError();
		}
	}, [updateTransferError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
	}, []);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<DropdownInput
				placeholder="Аккаунт списания"
				initSelected={initialValues.fromAccount}
				setValue={(value) => setFromAccountId(Number(value))}
			>
				{accounts.map((account, index) => (
					<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
				))}
			</DropdownInput>
			<InputError errors={fromAccountIdErrors}/>

			<DropdownInput
				placeholder="Аккаунт пополнения"
				initSelected={initialValues.toAccount}
				setValue={(value) => setToAccountId(Number(value))}
			>
				{accounts.map((account, index) => (
					<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
				))}
			</DropdownInput>
			<InputError errors={toAccountIdErrors}/>

			<MoneyInput placeholder="Сумма" value={amount} setValue={setAmount}/>
			<InputError errors={amountErrors}/>

			<Input placeholder="Описание" value={description} setValue={setDescription}/>
			<InputError errors={descriptionErrors}/>

			<DateInput placeholder="Дата" value={date} setValue={setDate}/>
			<InputError errors={dateErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isUpdateTransferLoading}
			>
				{isUpdateTransferLoading ? "Загрузка..." : "Обновить"}
			</Button>
		</form>
	)
}