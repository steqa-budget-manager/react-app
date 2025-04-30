import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import classes from "./LoginForm.module.css";

export const LoginForm = () => {
	return (
		<div className={classes.container}>
			<Input placeholder="Почта"/>
			<Input placeholder="Пароль"/>
			<Button accent onClick={() => {
			}}>Войти</Button>
		</div>
	)
}