import {FC, ReactElement} from "react";
import {TransactionProps} from "../../components/Transaction/Transaction.tsx";
import classes from "./TransactionsCard.module.css";
import clsx from "clsx";

export interface TransactionsCardProps {
	income?: boolean;
	expense?: boolean;
	date: Date
	total: number
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

	const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

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
				<small className={classes.total}>{formattedTotal} ₽</small>
			</div>
			<div className={classes.transactions}>{children}</div>
		</div>
	)
}