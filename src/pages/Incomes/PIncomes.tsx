import {useEffect, useState} from "react";
import classes from "./Incomes.module.css"
import {TransactionsHistory} from "../../blocks/TransactionsHistory/TransactionsHistory.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../blocks/ToastBar/ToastBar.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {AddIncomeForm} from "../../blocks/AddIncomeForm/AddIncomeForm.tsx";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {getAllTransactions} from "../../api/requests/transactionRequests.ts";

export const PIncomes = () => {
	const [messages, addMessage] = useMessagesTimeStack();
	const [showAddModal, setShowAddModal] = useState(false);
	const [incomes, setIncomes] = useState<TransactionResponse[]>([]);

	const [fetchGetIncomes, isGetIncomesLoading, getIncomesError, resetGetIncomesError] = useHttpRequest(
		async () => getAllTransactions(TransactionType.INCOME),
	);

	const addIncomeToList = (newIncome: TransactionResponse) => {
		setIncomes(prev => {
			const updated = [...prev, newIncome];
			return updated.sort((a, b) => b.date.getTime() - a.date.getTime());
		});
	};

	useEffect(() => {
		document.title = "Поступления";
		fetchGetIncomes().then(setIncomes);
	}, []);

	useEffect(() => {
		if (getIncomesError) {
			addMessage(getIncomesError);
			resetGetIncomesError();
		}
	}, [getIncomesError]);

	return (
		<>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>
			<div className={classes.container}>
				{isGetIncomesLoading ? (
					<small>Загрузка...</small>
				) : (<>
					<div className={classes.cards}></div>
					<div className={classes.filters}></div>
					<div className={classes.transactions}>
						<TransactionsHistory transactions={incomes} income/>
					</div>
					<div className={classes.footer}>
						<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
					</div>
				</>)}
			</div>
			{showAddModal && (
				<BottomModal onClose={() => setShowAddModal(false)}>
					<p><b>Добавить доход</b></p>
					<AddIncomeForm
						onError={addMessage}
						onSubmit={(newIncome) => {
							addIncomeToList(newIncome)
							setShowAddModal(false)
						}}
					/>
				</BottomModal>
			)}
		</>
	)
}