export const dayValidator = (day: number | null) => {
	if (day == null) return ["Значение не может быть пустым."];
	if (day < 1) return ["Значение не может быть меньше 1."];
	if (day > 28) return ["Значение не может быть больше 28"];
	return []
}