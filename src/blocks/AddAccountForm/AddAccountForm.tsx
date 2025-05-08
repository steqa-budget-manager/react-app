import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./AddAccountForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {nameValidator} from "../../validators/nameValidator.ts";
import {addAccount} from "../../api/requests/accountRequests.ts";
import {AddAccount} from "../../api/schemas/account/AddAccount.ts";

export interface AddAccountFormProps {
	onSubmit?: (newAccount: AccountResponse) => void
	onError?: (error: string) => void
}

export const AddAccountForm: FC<AddAccountFormProps> = ({onSubmit, onError}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>("", nameValidator);

	const [fetchAddAccount, isAddAccountLoading, addAccountError, resetAddAccountError] = useHttpRequest(
		async (account: AddAccount) => addAccount(account)
	)

	const isValid = useMemo(() => {
		return !nameEmpty && nameValid;
	}, [nameEmpty, nameValid]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const account: AddAccount = {
			name: name,
		};
		await fetchAddAccount(account)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	useEffect(() => {
		if (onError && addAccountError) {
			onError(addAccountError);
			resetAddAccountError();
		}
	}, [addAccountError]);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<Input placeholder="Название" value={name} setValue={setName}/>
			<InputError errors={nameErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isAddAccountLoading}
			>
				{isAddAccountLoading ? "Загрузка..." : "Добавить"}
			</Button>
		</form>
	)
}