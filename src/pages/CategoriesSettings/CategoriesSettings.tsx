import classes from "./CategoriesSettings.module.css";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Toast} from "../../components/Toast/Toast.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {useEffect, useState} from "react";
import {Modal} from "../../components/Modal/Modal.tsx";
import {CategoriesSettingsCard} from "../../blocks/CategoriesSettingsCard/CategoriesSettingsCard.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {AddCategoryForm} from "../../blocks/AddCategoryForm/AddCategoryForm.tsx";

export const PCategoriesSettings = () => {
	const [messages, addMessage] = useMessagesTimeStack();

	const [refreshCounter, setRefreshCounter] = useState(0);

	const [showAddModal, setShowAddModal] = useState(false);

	const handleAddCategory = () => {
		setShowAddModal(false);
		setRefreshCounter(refreshCounter + 1);
	}

	useEffect(() => {
		document.title = "Настройка категорий";
	}, []);

	return (
		<>
			<div className={classes.container}>
				<ToastBar>
					{messages.map((message, index) => (
						<Toast key={index} message={message} error/>
					))}
				</ToastBar>

				<div className={classes.content}>
					<CategoriesSettingsCard type={TransactionType.INCOME} onError={addMessage} refreshTrigger={refreshCounter}/>
					<CategoriesSettingsCard type={TransactionType.EXPENSE} onError={addMessage} refreshTrigger={refreshCounter}/>
				</div>
				<div className={classes.footer}>
					<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
				</div>
			</div>

			{showAddModal && (
				<Modal onClose={() => setShowAddModal(false)}>
					<AddCategoryForm
						onError={addMessage}
						onSubmit={() => handleAddCategory()}
					/>
				</Modal>
			)}
		</>
	)
}