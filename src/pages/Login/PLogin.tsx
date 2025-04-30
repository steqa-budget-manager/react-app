import classes from "./Login.module.css"
import {LoginForm} from "../../blocks/LoginForm/LoginForm.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export const PLogin = () => {
	const navigate = useNavigate();

	return (
		<div className={classes.container}>
			<h2>CashCache</h2>
			<div className={classes.form}>
				<LoginForm/>
				<Button link onClick={() => navigate("/registration")}>Зарегистрироваться</Button>
			</div>
		</div>
	)
}