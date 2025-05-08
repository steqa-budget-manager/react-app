export const nameValidator = (name?: string) => {
	if (!name) return ["Значение не может быть пустым"];
	if (name.length > 255) return ["Максимальная длина 255 символов."];
	return [];
}