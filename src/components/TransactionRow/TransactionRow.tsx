import {FC, ReactNode} from "react";
import classes from "./TransactionRow.module.css";
import clsx from "clsx";

export interface TransactionRowProps {
	onClick?: () => void,
	leftUpper?: string | ReactNode,
	rightUpper?: string | ReactNode,
	leftTop?: string | ReactNode,
	rightTop?: string | ReactNode,
	leftBottom?: string | ReactNode,
	rightBottom?: string | ReactNode,
	secondary?: boolean,
}

export const TransactionRow: FC<TransactionRowProps> = (
	{
		onClick,
		leftUpper,
		rightUpper,
		leftTop,
		rightTop,
		leftBottom,
		rightBottom,
		secondary,
	}
) => {
	return (
		<div
			className={clsx(classes.container, {[classes.secondaryShadow]: secondary})}
			onClick={onClick}
		>
			<div className={classes.left}>
				{leftUpper && (
					<small className={classes.secondary}>{leftUpper}</small>
				)}
				{leftTop && (
					<small><b>{leftTop}</b></small>
				)}
				{leftBottom && (
					<small className={classes.secondary}>{leftBottom}</small>
				)}
			</div>
			<div className={classes.right}>
				{rightUpper && (
					<small className={classes.secondary}>{rightUpper}</small>
				)}
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