import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {getAllTransactions} from "../../api/requests/transactionRequests.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {FC, useEffect, useMemo, useState} from "react";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {Transaction} from "../../components/Transaction/Transaction.tsx";
import {groupTransactionsByDate, TransactionsGroup} from "../../utils/groupTransactionsByDate.ts";
import {TransactionsCard} from "../TransactionsCard/TransactionsCard.tsx";
import classes from "./IncomesHistory.module.css";

export interface IncomesHistoryProps {
	onError?: (error: string) => void
}

export const IncomesHistory: FC<IncomesHistoryProps> = ({onError}) => {
	const [incomes, setIncomes] = useState<TransactionResponse[]>([]);

	const [fetchIncomes, isLoading, incomesError, resetIncomesError] = useHttpRequest(
		async () => getAllTransactions(TransactionType.INCOME),
	);

	const groupedTransactions = useMemo<TransactionsGroup[]>(
		() => groupTransactionsByDate(incomes),
		[incomes]
	);

	useEffect(() => {
		fetchIncomes().then(setIncomes);
	}, []);

	useEffect(() => {
		if (incomesError && onError) {
			onError(incomesError);
			resetIncomesError();
		}
	}, [incomesError]);

	return (
		<div className={classes.container}>
			{isLoading && (<small>Загрузка...</small>)}

			{groupedTransactions.map((group, index) => (
				<TransactionsCard key={index} date={group.date} total={group.total} income>
					{group.transactions.map((transaction) => (
						<Transaction
							key={transaction.id}
							description={transaction.description}
							amount={transaction.amount}
							category={transaction.category}
							account={transaction.account}
						/>
					))}
				</TransactionsCard>
			))}
		</div>
	);
};