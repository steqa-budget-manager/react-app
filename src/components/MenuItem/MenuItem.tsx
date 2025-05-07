import {FC} from "react";
import classes from "./MenuItem.module.css";
import {NavLink} from "react-router-dom";

interface MenuItemProps {
	text: string;
	to: string;
}

export const MenuItem: FC<MenuItemProps> = ({text, to}) => {
	return (
		<NavLink to={to} className={classes.link}>
			<p>{text}</p>
			<span className={classes.arrow}>ᐳ</span>
		</NavLink>
	)
}