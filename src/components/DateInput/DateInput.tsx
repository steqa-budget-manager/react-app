import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FC, InputHTMLAttributes} from "react";
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
			const now = new Date();
			date.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
			setValue(date);
		} else {
			setValue(null);
		}
	};

	const ReadOnlyInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
		<input {...props} readOnly className={classes.input}/>
	);

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
				locale={ru}
				customInput={<ReadOnlyInput/>}
			/>
		</div>
	);
}