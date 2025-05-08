import classes from "./Signup.module.css"
import {Button} from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {SignupForm} from "../../blocks/SignupForm/SignupForm.tsx";
import {useEffect} from "react";
import {useMessagesTimeStack} from "../../hooks/useMessagesTimeStack.ts";
import {Toast} from "../../components/Toast/Toast.tsx";
import {ToastBar} from "../../components/ToastBar/ToastBar.tsx";

export const PSignup = () => {
	const navigate = useNavigate();
	const [messages, addMessage] = useMessagesTimeStack();

	useEffect(() => {
		document.title = "Регистрация";
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
				<SignupForm onError={addMessage} onSubmit={() => navigate("/")}/>
				<Button link onClick={() => navigate("/login")}>Войти</Button>
			</div>
		</div>
	)
}