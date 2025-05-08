import {FC, useMemo} from "react";
import {TransactionRow} from "../../components/TransactionRow/TransactionRow.tsx";
import {groupTransactionsByDate, TransactionsGroup} from "../../utils/tableRowUtils.ts";
import {TransactionsCard} from "../../components/TransactionsCard/TransactionsCard.tsx";
import classes from "./TransactionsHistory.module.css";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useNavigate} from "react-router-dom";
import {fromCents} from "../../utils/moneyConverters.ts";

export interface TransactionsHistoryProps {
	rootPath: string;
	transactions: TransactionResponse[];
	income?: boolean;
	expense?: boolean;
}

export const TransactionsHistory: FC<TransactionsHistoryProps> = ({rootPath, transactions, income, expense}) => {
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
						<TransactionRow
							onClick={() => navigate(rootPath + "/" + transaction.id)}
							key={transaction.id}
							leftTop={transaction.description}
							rightTop={fromCents(transaction.amount) + " ₽"}
							leftBottom={transaction.category}
							rightBottom={transaction.account}
						/>
					))}
				</TransactionsCard>
			))}
		</div>
	);
};