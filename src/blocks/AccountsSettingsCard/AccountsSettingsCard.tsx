import {CardsMenu} from "../../components/CardsMenu/CardsMenu.tsx";
import {FC, useEffect, useState} from "react";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {getAllAccounts} from "../../api/requests/accountRequests.ts";
import {Controls} from "../../components/Controls/Controls.tsx";
import {Modal} from "../../components/Modal/Modal.tsx";
import {UpdateAccountForm} from "../UpdateAccountForm/UpdateAccountForm.tsx";
import {DeleteAccountForm} from "../DeleteAccountForm/DeleteAccountForm.tsx";

export interface AccountsSettingsCardProps {
	onError?: (error: string) => void
	refreshTrigger?: number,
}

export const AccountsSettingsCard: FC<AccountsSettingsCardProps> = ({onError, refreshTrigger}) => {
	const [accounts, setAccounts] = useState<AccountResponse[]>([]);

	const [selectedAccount, setSelectedAccount] = useState<AccountResponse>();

	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const handleDeleteAccount = () => {
		if (!selectedAccount) return;
		setAccounts(prev =>
			prev.filter(account => account.id !== selectedAccount.id)
		);
		setShowDeleteModal(false);
	}

	const handleUpdateAccount = (newAccount: AccountResponse) => {
		if (!selectedAccount) return;
		setAccounts(prev =>
			prev.map(account => account.id === newAccount.id ? newAccount : account)
		);
		setShowUpdateModal(false);
	}

	useEffect(() => {
		if (onError && getAccountsError) {
			onError(getAccountsError);
			resetGetAccountsError();
		}
	}, [getAccountsError]);

	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
	}, [refreshTrigger]);

	return (
		<>
			<CardsMenu header="Аккаунты">
				{accounts.map((account) => (<>
					<small>{account.name}</small>
					<Controls
						onEdit={() => {
							setSelectedAccount(account);
							setShowUpdateModal(true);
						}}
						onDelete={() => {
							setSelectedAccount(account);
							setShowDeleteModal(true);
						}}
					/>
				</>))}
			</CardsMenu>

			{showUpdateModal && selectedAccount && (
				<Modal onClose={() => setShowUpdateModal(false)}>
					<UpdateAccountForm
						initialValues={selectedAccount}
						onError={onError}
						onSubmit={(newAccount) => handleUpdateAccount(newAccount)}
					/>
				</Modal>
			)}

			{showDeleteModal && selectedAccount && (
				<Modal onClose={() => setShowDeleteModal(false)}>
					<DeleteAccountForm
						account={selectedAccount}
						onError={onError}
						onSubmit={() => handleDeleteAccount()}
					/>
				</Modal>
			)}
		</>
	)
}