import classes from "./NavigationButton.module.css";
import {FC} from "react";

interface NavigationButtonProps {
	text: string;
	onClick?: () => void;
}

export const NavigationButton: FC<NavigationButtonProps> = ({text, onClick}) => {
	return (
		<button className={classes.button} onClick={onClick}>
			<div className={classes.circle}></div>
			<div className={classes.circleGradient}></div>
			<small>{text}</small>
		</button>
	)
}