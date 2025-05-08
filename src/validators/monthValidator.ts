export const monthValidator = (month: number | null) => {
	if (month == null) return ["Значение не может быть пустым."];
	if (month < 1) return ["Значение не может быть меньше 1."];
	if (month > 12) return ["Значение не может быть больше 12"];
	return []
}