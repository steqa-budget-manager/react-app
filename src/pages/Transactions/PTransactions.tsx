import {FC, useEffect, useState} from "react";
import classes from "./Transactions.module.css"
import {TransactionsHistory} from "../../blocks/TransactionsHistory/TransactionsHistory.tsx";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../blocks/ToastBar/ToastBar.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {BottomModal} from "../../components/BottomModal/BottomModal.tsx";
import {AddTransactionForm} from "../../blocks/AddIncomeForm/AddTransactionForm.tsx";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {getAllTransactions} from "../../api/requests/transactionRequests.ts";
import {Navigation} from "../../blocks/Navigation/Navigation.tsx";

interface PTransactionsProps {
	type: TransactionType
	rootPath: string
}

export const PTransactions: FC<PTransactionsProps> = ({rootPath, type}) => {
	const [messages, addMessage] = useMessagesTimeStack();
	const [showAddModal, setShowAddModal] = useState(false);
	const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

	const [fetchGetTransactions, isGetTransactionsLoading, getTransactionsError, resetGetTransactionsError] = useHttpRequest(
		async () => getAllTransactions(type),
	);

	const addTransactionToList = (newTransaction: TransactionResponse) => {
		setTransactions(prev => {
			const updated = [...prev, newTransaction];
			return updated.sort((a, b) => b.date.getTime() - a.date.getTime());
		});
	};

	useEffect(() => {
		document.title = type == TransactionType.INCOME ? "Доходы" : "Расходы";
		fetchGetTransactions().then(setTransactions);
	}, [type]);

	useEffect(() => {
		if (getTransactionsError) {
			addMessage(getTransactionsError);
			resetGetTransactionsError();
		}
	}, [getTransactionsError]);

	return (
		<>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>

			<div className={classes.container}>
				{isGetTransactionsLoading ?
					(
						<small>Загрузка...</small>
					) :
					(<>
						<div className={classes.cards}></div>
						<div className={classes.filters}></div>
						<div className={classes.transactions}>
							<TransactionsHistory
								rootPath={rootPath}
								transactions={transactions}
								{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
							/>
						</div>
						<div className={classes.footer}>
							<Button onClick={() => setShowAddModal(true)}>Добавить</Button>
							<Navigation/>
						</div>
					</>)
				}
			</div>
			{showAddModal && (
				<BottomModal onClose={() => setShowAddModal(false)}>
					<AddTransactionForm
						type={type}
						onError={addMessage}
						onSubmit={(newTransaction) => {
							addTransactionToList(newTransaction)
							setShowAddModal(false)
						}}
					/>
				</BottomModal>
			)}
		</>
	)
}