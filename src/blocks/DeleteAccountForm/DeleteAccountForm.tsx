import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {deleteAccount, updateAccount} from "../../api/requests/accountRequests.ts";
import {FC, useEffect, useState} from "react";
import classes from "./DeleteAccountForm.module.css";
import {Button} from "../../components/Button/Button.tsx";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {UpdateAccount} from "../../api/schemas/account/UpdateAccount.ts";

interface DeleteAccountFormProps {
	account: AccountResponse;
	onSubmit?: () => void
	onError?: (error: string) => void
}

export const DeleteAccountForm: FC<DeleteAccountFormProps> = ({account, onSubmit, onError}) => {
	const [offerHide, setOfferHide] = useState(false);

	const [fetchDeleteAccount, isDeleteAccountLoading, deleteAccountError, resetDeleteAccountError] = useHttpRequest(
		async () => deleteAccount(account.id),
	);

	const [fetchUpdateAccount, isUpdateAccountLoading, updateAccountError, resetUpdateAccountError] = useHttpRequest(
		async (data: UpdateAccount) => updateAccount(account.id, data)
	)

	const onDelete = async () => {
		await fetchDeleteAccount()
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
		const account = {visible: false} as UpdateAccount;
		await fetchUpdateAccount(account)
			.then(() => {
				if (onSubmit) onSubmit();
			});
	};

	useEffect(() => {
		if (onError && deleteAccountError) {
			onError(deleteAccountError);
			resetDeleteAccountError();
		}
	}, [deleteAccountError]);

	useEffect(() => {
		if (onError && updateAccountError) {
			onError(updateAccountError);
			resetUpdateAccountError();
		}
	}, [updateAccountError]);

	return (
		<>
			{offerHide ? (<>
				<p className={classes.center}>
					Аккаунт не может быть удалён, так как он используется в существующих транзакциях.
				</p>
				<p className={classes.center}>
					Вы можете скрыть его из общего списка — он продолжит отображаться только в тех операциях,<br/>
					где уже был выбран.
				</p>
				<Button
					expense
					onClick={onHide}
					active={!isUpdateAccountLoading}
				>
					{isUpdateAccountLoading ? "Загрузка..." : "Скрыть"}
				</Button>
			</>) : (<>
				<p className={classes.center}>Вы действительно хотите<br/>безвозвратно удалить аккаунт?</p>
				<Button
					expense
					onClick={onDelete}
					active={!isDeleteAccountLoading}
				>
					{isDeleteAccountLoading ? "Загрузка..." : "Удалить"}
				</Button>
			</>)}
		</>
	)
}