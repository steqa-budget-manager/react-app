export const emailValidator = (email: string) => {
	if (!email) return ["Значение не может быть пустым."];
	const errors = []
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.toLowerCase())) errors.push("Неверный формат.")
	if (email.length > 255) errors.push("Максимальная длина 255 символов.");
	return errors;
}