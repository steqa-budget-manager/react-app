export const passwordValidator = (password: string) => {
	if (!password) return ["Значение не может быть пустым."];
	const errors = []
	if (password.length < 5) errors.push("Минимальная длина 5 символов.");
	if (password.length > 255) errors.push("Максимальная длина 255 символов.");
	return errors;
}