import classes from "./AccountsSettings.module.css";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Toast} from "../../components/Toast/Toast.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {AccountsSettingsCard} from "../../blocks/AccountsSettingsCard/AccountsSettingsCard.tsx";
import {useState} from "react";
import {Modal} from "../../components/Modal/Modal.tsx";
import {AddAccountForm} from "../../blocks/AddAccountForm/AddAccountForm.tsx";

export const PAccountsSettings = () => {
	const [messages, addMessage] = useMessagesTimeStack();

	const [refreshCounter, setRefreshCounter] = useState(0);

	const [showAddModal, setShowAddModal] = useState(false);

	const handleAddAccount = () => {
		setShowAddModal(false);
		setRefreshCounter(refreshCounter + 1);
	}

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				<div className={classes.content}>
					<AccountsSettingsCard onError={addMessage} refreshTrigger={refreshCounter}/>
				</div>
				<div className={classes.footer}>
					<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
				</div>
			</div>

			{showAddModal && (
				<Modal onClose={() => setShowAddModal(false)}>
					<AddAccountForm
						onError={addMessage}
						onSubmit={() => handleAddAccount()}
					/>
				</Modal>
			)}
		</>
	)
}