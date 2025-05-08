import classes from "./NumberInput.module.css";
import {ChangeEvent, FC} from "react";

interface NumberInputProps {
	value: number | null;
	setValue: (value: number | null) => void;
	placeholder?: string,
	min?: number;
	max?: number;
	step?: number;
}

export const NumberInput: FC<NumberInputProps> = ({value, setValue, placeholder, min, max, step}) => {
	return (
		<input
			placeholder={placeholder ? placeholder : ""}
			className={classes.input}
			value={value ? value : undefined}
			type="number"
			min={min}
			max={max}
			step={step}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value ? Number(e.target.value) : null)}
		/>
	)
}