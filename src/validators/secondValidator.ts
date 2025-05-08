export const secondValidator = (second: number | null) => {
	if (second == null) return ["Значение не может быть пустым."];
	if (second < 1) return ["Значение не может быть меньше 1."];
	if (second > 3153600000) return ["Значение не может быть больше 3 153 600 000"];
	return []
}