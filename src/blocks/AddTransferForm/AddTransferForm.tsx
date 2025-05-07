import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./AddTransferForm.module.css";
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
import {AddTransfer} from "../../api/schemas/transfers/AddTransfer.ts";
import {addTransfer} from "../../api/requests/transferRequests.ts";

export interface AddTransferFormProps {
	onSubmit?: (newTransfer: TransferResponse) => void
	onError?: (error: string) => void
}

export const AddTransferForm: FC<AddTransferFormProps> = ({onSubmit, onError}) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>("", descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(null, amountValidator);
	const [date, setDate, dateValid, dateEmpty, dateErrors] = useValidator<Date | null>(null, dateValidator);
	const [fromAccountId, setFromAccountId, fromAccountIdValid, fromAccountIdEmpty, fromAccountIdErrors] = useValidator<number | null>(null, requiredValidator);
	const [toAccountId, setToAccountId, toAccountIdValid, toAccountIdEmpty, toAccountIdErrors] = useValidator<number | null>(null, requiredValidator);

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchAddTransfer, isAddTransferLoading, addTransferError, resetAddTransferError] = useHttpRequest(
		async (transfer: AddTransfer) => addTransfer(transfer)
	)

	const isValid = useMemo(() => {
		return (
			!amountEmpty &&
			!dateEmpty &&
			!fromAccountIdEmpty &&
			!toAccountIdEmpty &&
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

		const transfer: AddTransfer = {
			amount: amount!,
			date: date!,
			fromAccountId: fromAccountId!,
			toAccountId: toAccountId!,
			description
		};

		await fetchAddTransfer(transfer)
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
		if (onError && addTransferError) {
			onError(addTransferError);
			resetAddTransferError();
		}
	}, [addTransferError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
	}, []);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<DropdownInput
				placeholder="Аккаунт списания"
				setValue={(value) => setFromAccountId(Number(value))}
			>
				{accounts.map((account, index) => (
					<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
				))}
			</DropdownInput>
			<InputError errors={fromAccountIdErrors}/>

			<DropdownInput
				placeholder="Аккаунт начисления"
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
				active={isValid && !isAddTransferLoading}
			>
				{isAddTransferLoading ? "Загрузка..." : "Добавить"}
			</Button>
		</form>
	)
}