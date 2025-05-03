export const requiredValidator = (value: number | null) => {
	if (!value) return ["Значение не может быть пустым."];
	return []
}