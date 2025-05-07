import {FC, ReactNode} from "react";
import classes from "./TableRow.module.css";

export interface TableRowProps {
	onClick?: () => void;
	leftTop?: string | ReactNode
	rightTop?: string | ReactNode
	leftBottom?: string | ReactNode
	rightBottom?: string | ReactNode
}

export const TableRow: FC<TableRowProps> = (
	{
		onClick,
		leftTop,
		rightTop,
		leftBottom,
		rightBottom
	}
) => {
	return (
		<div className={classes.container} onClick={onClick}>
			<div className={classes.left}>
				{leftTop && (
					<small><b>{leftTop}</b></small>
				)}
				{leftBottom && (
					<small className={classes.secondary}>{leftBottom}</small>
				)}
			</div>
			<div className={classes.right}>
				{rightTop && (
					<small>{rightTop}</small>
				)}
				{rightBottom && (
					<small className={classes.secondary}>{rightBottom}</small>
				)}
			</div>
		</div>
	)
}