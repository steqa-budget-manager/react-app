import classes from "./Button.module.css"
import {FC, ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps {
	children: ReactNode,
	onClick?: () => void,
	type?: "button" | "submit",
	active?: boolean,
	transparent?: boolean,
	accent?: boolean,
	income?: boolean,
	expense?: boolean,
	link?: boolean,
}

export const Button: FC<ButtonProps> = (
	{
		children,
		onClick = () => {
		},
		type = "button",
		active = true,
		transparent = false,
		accent = false,
		income = false,
		expense = false,
		link = false,
	}
) => {
	return (
		<button
			className={clsx(
				classes.button, {
					[classes.transparent]: transparent,
					[classes.accent]: accent,
					[classes.income]: income,
					[classes.expense]: expense,
					[classes.link]: link,
				}
			)}
			type={type}
			disabled={!active}
			onClick={onClick}
		>{children}</button>
	)
}