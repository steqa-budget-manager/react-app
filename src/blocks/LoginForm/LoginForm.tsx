import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import classes from "./LoginForm.module.css";
import {FC, useContext, useEffect, useMemo} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {loginRequest} from "../../api/requests/auth/loginRequest.ts";
import {setTokens} from "../../utils/authUtils.ts";
import {useValidator} from "../../hooks/useValidator.ts";
import {emailValidator} from "../../validators/emailValidator.ts";
import {InputError} from "../../components/InputError/InputError.tsx";
import {passwordValidator} from "../../validators/passwordValidator.tsx";
import {AuthContext} from "../../contexts/AuthContext.tsx";

export interface LoginFormProps {
	onSubmit?: () => void
	setError?: (error: string | null) => void
}

export const LoginForm: FC<LoginFormProps> = ({onSubmit, setError}) => {
	const [email, setEmail, emailValid, emailEmpty, emailErrors] = useValidator<string>("", emailValidator);
	const [password, setPassword, passwordValid, passwordEmpty, passwordErrors] = useValidator<string>("", passwordValidator);
	const {setIsLogged} = useContext(AuthContext);

	const [fetchLogin, isLoading, loginError] = useHttpRequest(async (email: string, password: string) => {
		return loginRequest(email, password);
	})

	const buttonActive = useMemo(() => {
		return (
			!emailEmpty &&
			!passwordEmpty &&
			emailValid &&
			passwordValid
		);
	}, [emailEmpty, passwordEmpty, emailValid, passwordValid]);

	const onClick = async () => {
		await fetchLogin(email, password)
			.then((response) => {
				setIsLogged(true);
				setTokens(response.access, response.refresh);
				if (onSubmit) onSubmit();
			})
	};

	useEffect(() => {
		if (setError) setError(loginError);
	}, [loginError]);

	return (
		<div className={classes.container}>
			<Input placeholder="Почта" value={email} setValue={setEmail}/>
			<InputError errors={emailErrors}/>
			<Input placeholder="Пароль" value={password} setValue={setPassword}/>
			<InputError errors={passwordErrors}/>
			<Button
				accent
				onClick={onClick}
				active={buttonActive && !isLoading}
			>
				{isLoading ? "Загрузка..." : "Войти"}
			</Button>
		</div>
	)
}