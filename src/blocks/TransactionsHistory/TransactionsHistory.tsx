import {FC, useMemo} from "react";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {groupTransactionsByDate, TransactionsGroup} from "../../utils/tableRowUtils.ts";
import {Table} from "../../components/Table/Table.tsx";
import classes from "./TransactionsHistory.module.css";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {useNavigate} from "react-router-dom";
import {fromCents} from "../../utils/moneyConverters.ts";
import {NotFoundText} from "../../components/NotFoundText/NotFoundText.tsx";
import {formattedDate} from "../../utils/dateUtils.ts";

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
			{transactions.length > 0 ? (
				groupedTransactions.map((group, index) => (
					<Table
						key={index}
						title={formattedDate(group.date)}
						subtitle={fromCents(group.total) + "₽"}
						income={income}
						expense={expense}
					>
						{group.transactions.map((transaction) => (
							<TableRow
								onClick={() => navigate(rootPath + "/" + transaction.id)}
								key={transaction.id}
								leftTop={transaction.description}
								rightTop={fromCents(transaction.amount) + " ₽"}
								leftBottom={transaction.category}
								rightBottom={transaction.account}
							/>
						))}
					</Table>
				))
			) : (
				<NotFoundText/>
			)}
		</div>
	);
};