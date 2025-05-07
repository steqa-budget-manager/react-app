import {FC, ReactElement} from "react";
import {TableRowProps} from "../../components/TableRow/TableRow.tsx";
import classes from "./TransactionsCard.module.css";
import clsx from "clsx";
import {fromCents} from "../../utils/moneyConverters.ts";
import {formattedDate} from "../../utils/dateUtils.ts";

export interface TransactionsCardProps {
	income?: boolean;
	expense?: boolean;
	date: Date
	total: bigint
	children: ReactElement<TableRowProps> | ReactElement<TableRowProps>[];
}

export const TransactionsCard: FC<TransactionsCardProps> = (
	{
		income,
		expense,
		date,
		total,
		children
	}
) => {

	return (
		<div
			className={clsx(
				classes.card, {
					[classes.income]: income,
					[classes.expense]: expense,
				}
			)}
		>
			<div className={classes.header}>
				<p><b>{formattedDate(date)}</b></p>
				<small className={classes.total}>{fromCents(total)} ₽</small>
			</div>
			<div className={classes.transactions}>{children}</div>
		</div>
	)
}