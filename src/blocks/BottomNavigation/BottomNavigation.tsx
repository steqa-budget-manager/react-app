import classes from "./BottomNavigation.module.css";
import {Navigation} from "../Navigation/Navigation.tsx";
import {FC, ReactNode} from "react";

interface BottomNavigationProps {
	children?: ReactNode | ReactNode[];
}

export const BottomNavigation: FC<BottomNavigationProps> = ({children}) => {
	return (
		<div className={classes.bottomNavigation}>
			{children}
			<Navigation/>
		</div>
	)
}