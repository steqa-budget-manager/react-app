import classes from "./TransactionTemplates.module.css";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";
import {Toast} from "../../components/Toast/Toast.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {FC, useEffect, useState} from "react";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {ruLocale} from "../../locale/ruLocale.ts";
import {
	TransactionTemplatesSettingsCard
} from "../../blocks/TransactionTemplatesSettingsCard/TransactionTemplatesSettingsCard.tsx";
import {AddTransactionTemplateForm} from "../../blocks/AddTransactionTemplateForm/AddTransactionTemplateForm.tsx";

interface PTransactionTemplatesProps {
	rootPath: string;
}

export const PTransactionTemplates: FC<PTransactionTemplatesProps> = ({rootPath}) => {
	const [messages, addMessage] = useMessagesTimeStack();

	const [refreshCounter, setRefreshCounter] = useState(0);

	const [type, setType] = useState<string | null>();

	const [showAddModal, setShowAddModal] = useState(false);

	const closeModal = () => {
		setShowAddModal(false);
		setType(null);
	}

	const handleAddTransactionTemplate = () => {
		closeModal();
		setRefreshCounter(refreshCounter + 1);
	}

	useEffect(() => {
		document.title = "Шаблоны транзакций";
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
					<TransactionTemplatesSettingsCard
						rootPath={rootPath}
						type={TransactionType.INCOME}
						onError={addMessage}
						refreshTrigger={refreshCounter}
					/>
					<TransactionTemplatesSettingsCard
						rootPath={rootPath}
						type={TransactionType.EXPENSE}
						onError={addMessage}
						refreshTrigger={refreshCounter}
					/>
				</div>
				<div className={classes.footer}>
					<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
				</div>
			</div>

			{showAddModal && (
				<BottomModal onClose={() => closeModal()}>
					<DropdownInput
						placeholder="Тип транзакции"
						setValue={(value) => setType(value)}
					>
						{Object.values(TransactionType).map((type, index) => (
							<DropdownInputOption key={index} label={ruLocale(type)} value={type}/>
						))}
					</DropdownInput>
					{type == TransactionType.INCOME && (
						<AddTransactionTemplateForm
							type={TransactionType.INCOME}
							onError={addMessage}
							onSubmit={() => handleAddTransactionTemplate()}
						/>
					)}
					{type == TransactionType.EXPENSE && (
						<AddTransactionTemplateForm
							type={TransactionType.EXPENSE}
							onError={addMessage}
							onSubmit={() => handleAddTransactionTemplate()}
						/>
					)}
				</BottomModal>
			)}
		</>
	)
}