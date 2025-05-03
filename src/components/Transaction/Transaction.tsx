import {FC} from "react";
import classes from "./Transaction.module.css";

export interface TransactionProps {
	description: string
	amount: number
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

	const formattedAmount = new Intl.NumberFormat("ru-RU").format(amount);

	return (
		<div className={classes.container}>
			<div className={classes.left}>
				<small className={classes.description}><b>{description}</b></small>
				<small className={classes.secondary}>{category}</small>
			</div>
			<div className={classes.right}>
				<small className={classes.amount}>{formattedAmount} ₽</small>
				<small className={classes.secondary}>{account}</small>
			</div>
		</div>
	)
}