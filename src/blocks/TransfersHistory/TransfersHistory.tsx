import {FC, useMemo} from "react";
import {TransactionRow} from "../../components/TransactionRow/TransactionRow.tsx";
import {groupTransfersByDate, TransfersGroup} from "../../utils/tableRowUtils.ts";
import {TransactionsCard} from "../../components/TransactionsCard/TransactionsCard.tsx";
import classes from "./TransfersHistory.module.css";
import {useNavigate} from "react-router-dom";
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {fromCents} from "../../utils/moneyConverters.ts";
import {TransferAccounts} from "../../components/TransferAccounts/TransferAccounts.tsx";

export interface TransfersHistoryProps {
	rootPath: string;
	transfers: TransferResponse[];
	income?: boolean;
	expense?: boolean;
}

export const TransfersHistory: FC<TransfersHistoryProps> = ({rootPath, transfers, income, expense}) => {
	const navigate = useNavigate();

	const groupedTransfers = useMemo<TransfersGroup[]>(
		() => groupTransfersByDate(transfers),
		[transfers]
	);

	return (
		<div className={classes.container}>
			{groupedTransfers.map((group, index) => (
				<TransactionsCard key={index} date={group.date} total={group.total} income={income} expense={expense}>
					{group.transfers.map((transfer) => (
						<TransactionRow
							onClick={() => navigate(rootPath + "/" + transfer.id)}
							key={transfer.id}
							leftTop={transfer.description}
							rightTop={fromCents(transfer.amount) + " ₽"}
							leftBottom={<TransferAccounts from={transfer.fromAccount} to={transfer.toAccount}/>}
						/>
					))}
				</TransactionsCard>
			))}
		</div>
	);
};