import classes from "./Button.module.css"
import {FC, ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps {
	children: ReactNode,
	onClick: () => void,
	accent?: boolean,
	link?: boolean,
}

export const Button: FC<ButtonProps> = (
	{
		children,
		onClick,
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
			onClick={onClick}
		>{children}</button>
	)
}