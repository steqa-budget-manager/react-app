import classes from "./Button.module.css"
import {FC, ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps {
	children: ReactNode,
	onClick: () => void,
	active?: boolean,
	accent?: boolean,
	link?: boolean,
}

export const Button: FC<ButtonProps> = (
	{
		children,
		onClick,
		active = true,
		accent = false,
		link = false,
	}
) => {
	return (
		<button
			className={clsx(
				classes.button, {
					[classes.accent]: accent,
					[classes.link]: link,
				}
			)}
			disabled={!active}
			onClick={onClick}
		>{children}</button>
	)
}