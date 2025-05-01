import classes from "./Registration.module.css"
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {RegistrationForm} from "../../blocks/RegistrationForm/RegistrationForm.tsx";
import {useEffect} from "react";

export const PRegistration = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Регистрация";
	}, []);

	return (
		<div className={classes.container}>
			<h2>CashCache</h2>
			<div className={classes.form}>
				<RegistrationForm/>
				<Button link onClick={() => navigate("/login")}>Войти</Button>
			</div>
		</div>
	)
}