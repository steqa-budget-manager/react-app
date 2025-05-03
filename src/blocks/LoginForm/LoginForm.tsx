import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import classes from "./LoginForm.module.css";
import {FC, FormEvent, useContext, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {setTokens} from "../../utils/authUtils.ts";
import {useValidator} from "../../hooks/useValidator.ts";
import {emailValidator} from "../../validators/emailValidator.ts";
import {InputError} from "../../components/InputError/InputError.tsx";
import {passwordValidator} from "../../validators/passwordValidator.ts";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {loginRequest} from "../../api/requests/authRequests.ts";

export interface LoginFormProps {
	onSubmit?: () => void
	onError?: (error: string) => void
}

export const LoginForm: FC<LoginFormProps> = ({onSubmit, onError}) => {
	const [email, setEmail, emailValid, emailEmpty, emailErrors] = useValidator<string>("", emailValidator);
	const [password, setPassword, passwordValid, passwordEmpty, passwordErrors] = useValidator<string>("", passwordValidator);
	const {setIsLogged} = useContext(AuthContext);

	const [fetchLogin, isLoading, loginError, resetLoginError] = useHttpRequest(
		async (email: string, password: string) => loginRequest(email, password)
	)

	const buttonActive = useMemo(() => {
		return (
			!emailEmpty &&
			!passwordEmpty &&
			emailValid &&
			passwordValid
		);
	}, [emailEmpty, passwordEmpty, emailValid, passwordValid]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		await fetchLogin(email, password)
			.then((response) => {
				setIsLogged(true);
				setTokens(response.access, response.refresh);
				if (onSubmit) onSubmit();
			})
	};

	useEffect(() => {
		if (loginError && onError) {
			onError(loginError);
			resetLoginError();
		}
	}, [loginError]);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<Input placeholder="Почта" value={email} setValue={setEmail}/>
			<InputError errors={emailErrors}/>
			<Input placeholder="Пароль" value={password} setValue={setPassword}/>
			<InputError errors={passwordErrors}/>
			<Button
				accent
				type="submit"
				active={buttonActive && !isLoading}
			>
				{isLoading ? "Загрузка..." : "Войти"}
			</Button>
		</form>
	)
}