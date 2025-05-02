import {FC} from "react";
import classes from "./Toast.module.css";
import clsx from "clsx";

interface ToastProps {
	message: string,
	error?: boolean,
}

export const Toast: FC<ToastProps> = ({message, error}) => {
	return (
		<div
			className={clsx(
				classes.toast, {
					[classes.error]: error,
				}
			)}
		>
			<small className={classes.message}>{message}</small>
		</div>
	)
}