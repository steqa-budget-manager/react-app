import {FC, useMemo} from "react";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {groupTransfersByDate, TransfersGroup} from "../../utils/tableRowUtils.ts";
import {Table} from "../../components/Table/Table.tsx";
import classes from "./TransfersHistory.module.css";
import {useNavigate} from "react-router-dom";
import {TransferResponse} from "../../api/schemas/transfers/TransferResponse.ts";
import {fromCents} from "../../utils/moneyConverters.ts";
import {TransferAccounts} from "../../components/TransferAccounts/TransferAccounts.tsx";
import {NotFoundText} from "../../components/NotFoundText/NotFoundText.tsx";
import {formattedDate} from "../../utils/dateUtils.ts";

export interface TransfersHistoryProps {
	rootPath: string;
	transfers: TransferResponse[];
}

export const TransfersHistory: FC<TransfersHistoryProps> = ({rootPath, transfers}) => {
	const navigate = useNavigate();

	const groupedTransfers = useMemo<TransfersGroup[]>(
		() => groupTransfersByDate(transfers),
		[transfers]
	);

	return (
		<div className={classes.container}>
			{transfers.length > 0 ? (
				groupedTransfers.map((group, index) => (
					<Table
						key={index}
						title={formattedDate(group.date)}
						subtitle={fromCents(group.total) + "₽"}
						accent
					>
						{group.transfers.map((transfer) => (
							<TableRow
								onClick={() => navigate(rootPath + "/" + transfer.id)}
								key={transfer.id}
								leftTop={transfer.description}
								rightTop={fromCents(transfer.amount) + " ₽"}
								leftBottom={<TransferAccounts from={transfer.fromAccount} to={transfer.toAccount}/>}
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