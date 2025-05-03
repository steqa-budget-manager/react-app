import {FC} from "react";
import classes from "./DropdownInput.module.css";

export interface DropdownInputOptionProps {
	label: string;
	onClick?: () => void;
	value: string;
}

export const DropdownInputOption: FC<DropdownInputOptionProps> = ({label, onClick}) => {
	return (
		<div className={classes.option} onClick={onClick}><small>{label}</small></div>
	)
}