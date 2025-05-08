export const requiredValidator = (value: number | string | null) => {
	if (!value) return ["Значение не может быть пустым."];
	return []
}