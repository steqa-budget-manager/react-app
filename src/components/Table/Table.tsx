import {FC, ReactElement} from "react";
import {TableRowProps} from "../TableRow/TableRow.tsx";
import classes from "./Table.module.css";
import clsx from "clsx";

export interface TableProps {
	income?: boolean,
	expense?: boolean,
	accent?: boolean,
	title: string,
	subtitle: string,
	children: ReactElement<TableRowProps> | ReactElement<TableRowProps>[],
}

export const Table: FC<TableProps> = (
	{
		income,
		expense,
		accent,
		title,
		subtitle,
		children
	}
) => {

	return (
		<div
			className={clsx(
				classes.card, {
					[classes.income]: income,
					[classes.expense]: expense,
					[classes.accent]: accent,
				}
			)}
		>
			<div className={classes.header}>
				<p><b>{title}</b></p>
				<small className={classes.total}>{subtitle}</small>
			</div>
			<div className={classes.rows}>{children}</div>
		</div>
	)
}