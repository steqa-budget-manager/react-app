import classes from "./Login.module.css"
import {LoginForm} from "../../blocks/LoginForm/LoginForm.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";

export const PLogin = () => {
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	useEffect(() => {
		document.title = "Вход";
	}, []);

	return (
		<div className={classes.container}>
			<h2>CashCache</h2>
			<ToastBar>
				{messages.map((message, index) => (
					<Toast key={index} message={message} error/>
				))}
			</ToastBar>
			<div className={classes.form}>
				<LoginForm onError={addMessage} onSubmit={() => navigate("/")}/>
				<Button link onClick={() => navigate("/signup")}>Зарегистрироваться</Button>
			</div>
		</div>
	)
}