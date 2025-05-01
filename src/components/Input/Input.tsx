import classes from "./Input.module.css"
import {ChangeEvent, FC} from "react";

interface InputProps {
	value: string;
	setValue: (value: string) => void;
	placeholder?: string,
}

export const Input: FC<InputProps> = ({value, setValue, placeholder}) => {
	return (
		<input
			placeholder={placeholder ? placeholder : ""}
			className={classes.input}
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
		/>
	)
}