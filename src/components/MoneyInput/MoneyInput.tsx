import {ChangeEvent, FC, useState} from "react";
import classes from "./MoneyInput.module.css";
import {toCents} from "../../utils/moneyConverters.ts";

interface MoneyInputProps {
	value: bigint | null;
	setValue: (value: bigint | null) => void;
	placeholder?: string,
}

export const MoneyInput: FC<MoneyInputProps> = ({value, setValue, placeholder}) => {
	const [str, setStr] = useState<string>(value !== null ? value.toString().slice(0, -2) : "");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;

		if (val === "") {
			setStr("");
			setValue(null);
			return;
		}

		const moneyRegex = /^\d*(?:\.\d{0,2})?$/;
		if (moneyRegex.test(val)) {
			setStr(val);
			if (!val.endsWith(".")) {
				setValue(toCents(val));
			}
		}
	};

	return (
		<div className={classes.wrapper}>
			<input
				type="text"
				inputMode="decimal"
				placeholder={placeholder ? placeholder : ""}
				value={str}
				onChange={onChange}
				className={classes.input}
			/>
			<span className={classes.symbol}>₽</span>
		</div>
	);
}