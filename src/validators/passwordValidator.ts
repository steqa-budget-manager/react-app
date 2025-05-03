export const passwordValidator = (password: string) => {
	if (!password) return ["Значение не может быть пустым."];
	if (password.length < 5) return ["Минимальная длина 5 символов."];
	if (password.length > 255) return ["Максимальная длина 255 символов."];
	return []
}