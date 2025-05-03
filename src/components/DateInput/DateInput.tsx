import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FC} from "react";
import classes from "./DateInput.module.css";
import {ru} from "date-fns/locale";
import "./DateInput.css"

interface DateInputProps {
	value: Date | null;
	setValue: (value: Date) => void;
	placeholder?: string,
}

export const DateInput: FC<DateInputProps> = ({value, setValue, placeholder}) => {
	return (
		<>
			<div style={{width: "100%"}}>
				<DatePicker
					selected={value}
					onChange={(date) => setValue(date!)}
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
		</>
	);
}