import {FC, ReactElement} from "react";
import {TransactionProps} from "../../components/Transaction/Transaction.tsx";
import classes from "./TransactionsCard.module.css";
import clsx from "clsx";
import {fromCents} from "../../utils/moneyConverters.ts";

export interface TransactionsCardProps {
	income?: boolean;
	expense?: boolean;
	date: Date
	total: bigint
	children: ReactElement<TransactionProps> | ReactElement<TransactionProps>[];
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

	const formattedDate = date.toLocaleDateString("ru", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} as const).replace(/г\./, "");

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
				<p><b>{formattedDate}</b></p>
				<small className={classes.total}>{fromCents(total)} ₽</small>
			</div>
			<div className={classes.transactions}>{children}</div>
		</div>
	)
}