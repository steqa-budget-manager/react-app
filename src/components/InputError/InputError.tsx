import {FC} from "react";
import classes from "./InputError.module.css";

interface InputErrorProps {
	errors: string[],
}

export const InputError: FC<InputErrorProps> = ({errors}) => {
	if (!errors || errors.length === 0) return null;

	return (
		<div className={classes.container}>
			{errors.map((error, index) => (
				<small key={index} className={classes.error}>{error}</small>
			))}
		</div>
	)
}