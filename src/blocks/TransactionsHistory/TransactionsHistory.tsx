import {FC, useMemo} from "react";
import {Transaction} from "../../components/Transaction/Transaction.tsx";
import {groupTransactionsByDate, TransactionsGroup} from "../../utils/groupTransactionsByDate.ts";
import {TransactionsCard} from "../TransactionsCard/TransactionsCard.tsx";
import classes from "./TransactionsHistory.module.css";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useNavigate} from "react-router-dom";

export interface TransactionsHistoryProps {
	transactions: TransactionResponse[];
	income?: boolean;
	expense?: boolean;
}

export const TransactionsHistory: FC<TransactionsHistoryProps> = ({transactions, income, expense}) => {
	const navigate = useNavigate();

	const groupedTransactions = useMemo<TransactionsGroup[]>(
		() => groupTransactionsByDate(transactions),
		[transactions]
	);

	return (
		<div className={classes.container}>
			{groupedTransactions.map((group, index) => (
				<TransactionsCard key={index} date={group.date} total={group.total} income={income} expense={expense}>
					{group.transactions.map((transaction) => (
						<Transaction
							onClick={() => navigate("/incomes/" + transaction.id)}
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