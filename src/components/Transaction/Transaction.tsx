import {FC} from "react";
import classes from "./Transaction.module.css";
import {fromCents} from "../../utils/moneyConverters.ts";

export interface TransactionProps {
	description: string
	amount: bigint
	category: string
	account: string
}

export const Transaction: FC<TransactionProps> = (
	{
		description,
		amount,
		category,
		account
	}
) => {
	return (
		<div className={classes.container}>
			<div className={classes.left}>
				<small><b>{description}</b></small>
				<small className={classes.secondary}>{category}</small>
			</div>
			<div className={classes.right}>
				<small>{fromCents(amount)} ₽</small>
				<small className={classes.secondary}>{account}</small>
			</div>
		</div>
	)
}