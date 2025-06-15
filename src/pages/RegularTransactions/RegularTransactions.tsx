import classes from "./RegularTransactions.module.css";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Toast} from "../../components/Toast/Toast.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {FC, useEffect, useState} from "react";
import {AddRegularTransactionForm} from "../../blocks/AddRegularTransactionForm/AddRegularTransactionForm.tsx";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {ruLocale} from "../../locale/ruLocale.ts";
import {
	TransactionRegularsSettingsCard
} from "../../blocks/TransactionRegularsSettingsCard/TransactionRegularsSettingsCard.tsx";
import {useNavigate} from "react-router-dom";
import {Modal} from "../../components/Modal/Modal.tsx";

interface PRegularTransactionsProps {
	rootPath: string;
	topPath: string;
}

export const PRegularTransactions: FC<PRegularTransactionsProps> = ({rootPath, topPath}) => {
	const navigate = useNavigate();

	const [messages, addMessage] = useMessagesTimeStack();

	const [refreshCounter, setRefreshCounter] = useState(0);

	const [type, setType] = useState<string | null>();

	const [showAddModal, setShowAddModal] = useState(false);

	const closeModal = () => {
		setShowAddModal(false);
		setType(null);
	}

	const handleAddRegularTransaction = () => {
		closeModal();
		setRefreshCounter(refreshCounter + 1);
	}

	useEffect(() => {
		document.title = "Регулярные транзакции";
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
					<TransactionRegularsSettingsCard
						rootPath={rootPath}
						type={TransactionType.INCOME}
						onError={addMessage}
						refreshTrigger={refreshCounter}
					/>
					<TransactionRegularsSettingsCard
						rootPath={rootPath}
						type={TransactionType.EXPENSE}
						onError={addMessage}
						refreshTrigger={refreshCounter}
					/>
				</div>
				<div className={classes.footer}>
					<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
					<Button link onClick={() => navigate(topPath)}>Назад</Button>
				</div>
			</div>

			{showAddModal && (
				<Modal onClose={() => closeModal()}>
					<DropdownInput
						placeholder="Тип транзакции"
						setValue={(value) => setType(value)}
					>
						{Object.values(TransactionType).map((type, index) => (
							<DropdownInputOption key={index} label={ruLocale(type)} value={type}/>
						))}
					</DropdownInput>
					{type == TransactionType.INCOME && (
						<AddRegularTransactionForm
							type={TransactionType.INCOME}
							onError={addMessage}
							onSubmit={() => handleAddRegularTransaction()}
						/>
					)}
					{type == TransactionType.EXPENSE && (
						<AddRegularTransactionForm
							type={TransactionType.EXPENSE}
							onError={addMessage}
							onSubmit={() => handleAddRegularTransaction()}
						/>
					)}
				</Modal>
			)}
		</>
	)
}