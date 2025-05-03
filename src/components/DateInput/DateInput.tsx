import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FC} from "react";
import classes from "./DateInput.module.css";
import {ru} from "date-fns/locale";
import "./DateInput.css"

interface DateInputProps {
	value: Date | null;
	setValue: (value: Date | null) => void;
	placeholder?: string,
}

export const DateInput: FC<DateInputProps> = ({value, setValue, placeholder}) => {
	const handleChange = (date: Date | null) => {
		if (date) {
			const nowUtc = new Date();
			date.setUTCHours(nowUtc.getUTCHours(), nowUtc.getUTCMinutes(), nowUtc.getUTCSeconds(), nowUtc.getUTCMilliseconds());
			setValue(date);
		} else {
			setValue(null);
		}
	};

	return (
		<div style={{width: "100%"}}>
			<DatePicker
				selected={value}
				onChange={handleChange}
				dateFormat="dd.MM.yyyy"
				placeholderText={placeholder}
				withPortal
				showMonthDropdown
				showYearDropdown
				isClearable
				todayButton="Сегодня"
				className={classes.input}
				locale={ru}
			/>
		</div>
	);
}