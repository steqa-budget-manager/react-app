import {Dispatch, SetStateAction, useEffect, useState} from "react";

type ValidateCallback<T> = (value: T) => string[]

type UseValidate<T> = [
	T,
	Dispatch<SetStateAction<T>>,
	boolean,
	boolean,
	string[],
	() => void
];

export const useValidator = <T>(
	defaultValue: T,
	validateFunc: ValidateCallback<T>,
): UseValidate<T> => {
	const [value, setValue] = useState<T>(defaultValue)
	const [errors, setErrors] = useState<string[]>([])
	const [isValid, setIsValid] = useState<boolean>(true)
	const [isEmpty, setIsEmpty] = useState<boolean>(true)

	const validate = () => {
		const errorsList = validateFunc(value)
		setErrors(errorsList)

		if (value == defaultValue) {
			setErrors([])
			setIsEmpty(true)
		} else setIsEmpty(false)

		if (errorsList.length > 0) setIsValid(false)
		else setIsValid(true)
	};

	useEffect(() => {
		validate()
	}, [value])

	return [value, setValue, isValid, isEmpty, errors, validate]
};