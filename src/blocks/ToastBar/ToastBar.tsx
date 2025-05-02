import {FC, ReactNode} from "react";
import classes from "./ToastBar.module.css";

interface ToastBarProps {
	children: ReactNode,
}

export const ToastBar: FC<ToastBarProps> = ({children}) => {
	return (
		<div className={classes.container}>
			{children}
		</div>
	)
}