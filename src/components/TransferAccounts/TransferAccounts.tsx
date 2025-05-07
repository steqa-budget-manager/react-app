import {FC} from "react";
import classes from "./TransferAccounts.module.css";

interface TransferAccountsProps {
	from: string;
	to: string;
}

export const TransferAccounts: FC<TransferAccountsProps> = ({from, to}) => {
	return (
		<div className={classes.container}>
			<small>{from}</small>
			➙
			<small>{to}</small>
		</div>
	)
}