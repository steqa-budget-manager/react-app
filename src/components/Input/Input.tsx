import classes from "./Input.module.css"
import {FC} from "react";

interface InputProps {
	placeholder?: string,
}

export const Input: FC<InputProps> = ({placeholder}) => {
	return (
		<input type="text" placeholder={placeholder ? placeholder : ""} className={classes.input}/>
	)
}