import classes from "./Login.module.css"
import {LoginForm} from "../../blocks/LoginForm/LoginForm.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const PLogin = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		document.title = "Вход";
	}, []);

	return (
		<div className={classes.container}>
			<h2>CashCache</h2>
			<p>{error}</p>
			<div className={classes.form}>
				<LoginForm setError={setError} onSubmit={() => navigate("/")}/>
				<Button link onClick={() => navigate("/registration")}>Зарегистрироваться</Button>
			</div>
		</div>
	)
}