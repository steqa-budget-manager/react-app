import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import classes from "./SignupForm.module.css";
import {FC, FormEvent, useContext, useEffect, useMemo} from "react";
import {useValidator} from "../../hooks/useValidator.ts";
import {emailValidator} from "../../validators/emailValidator.ts";
import {passwordValidator} from "../../validators/passwordValidator.tsx";
import {AuthContext} from "../../contexts/AuthContext.tsx";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {setTokens} from "../../utils/authUtils.ts";
import {InputError} from "../../components/InputError/InputError.tsx";
import {signupRequest} from "../../api/requests/auth/signupRequest.ts";

export interface SignupFormProps {
	onSubmit?: () => void
	onError?: (error: string) => void
}

export const SignupForm: FC<SignupFormProps> = ({onSubmit, onError}) => {
	const [email, setEmail, emailValid, emailEmpty, emailErrors] = useValidator<string>("", emailValidator);
	const [password, setPassword, passwordValid, passwordEmpty, passwordErrors] = useValidator<string>("", passwordValidator);
	const {setIsLogged} = useContext(AuthContext);

	const [fetchSignup, isLoading, signupError, resetSignupError] = useHttpRequest(async (email: string, password: string) => {
		return signupRequest(email, password);
	})

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
		await fetchSignup(email, password)
			.then((response) => {
				setIsLogged(true);
				setTokens(response.access, response.refresh);
				if (onSubmit) onSubmit();
			})
	};

	useEffect(() => {
		if (signupError && onError) {
			onError(signupError);
			resetSignupError();
		}
	}, [signupError]);

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
				{isLoading ? "Загрузка..." : "Зарегистрироваться"}
			</Button>
		</form>
	)
}