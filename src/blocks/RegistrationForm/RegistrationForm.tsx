import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import classes from "./RegistrationForm.module.css";

export const RegistrationForm = () => {
	return (
		<div className={classes.container}>
			<Input placeholder="Почта"/>
			<Input placeholder="Пароль"/>
			<Button accent onClick={() => {
			}}>Зарегистрироваться</Button>
		</div>
	)
}