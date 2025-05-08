import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./UpdateAccountForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {nameValidator} from "../../validators/nameValidator.ts";
import {UpdateAccount} from "../../api/schemas/account/UpdateAccount.ts";
import {updateAccount} from "../../api/requests/accountRequests.ts";

export interface UpdateAccountFormProps {
	initialValues: AccountResponse
	onSubmit?: (newAccount: AccountResponse) => void
	onError?: (error: string) => void
}

export const UpdateAccountForm: FC<UpdateAccountFormProps> = ({initialValues, onSubmit, onError}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>(initialValues.name, nameValidator);

	const [fetchUpdateAccount, isUpdateAccountLoading, updateAccountError, resetUpdateAccountError] = useHttpRequest(
		async (account: UpdateAccount) => updateAccount(initialValues.id, account)
	)

	const isValid = useMemo(() => {
		return !nameEmpty && nameValid;
	}, [nameEmpty, nameValid]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const account = {
			...(!nameEmpty && {name}),
		} as UpdateAccount;

		await fetchUpdateAccount(account)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	useEffect(() => {
		if (onError && updateAccountError) {
			onError(updateAccountError);
			resetUpdateAccountError();
		}
	}, [updateAccountError]);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<Input placeholder="Название" value={name} setValue={setName}/>
			<InputError errors={nameErrors}/>

			<Button
				accent
				type="submit"
				active={isValid && !isUpdateAccountLoading}
			>
				{isUpdateAccountLoading ? "Загрузка..." : "Обновить"}
			</Button>
		</form>
	)
}