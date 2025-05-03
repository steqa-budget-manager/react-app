export const amountValidator = (amount: bigint | null) => {
	if (!amount) return ["Значение не может быть пустым."];
	if (amount < 0) return ["Значение не может быть меньше 0."];
	if (amount > 100000000000000000n) return ["Значение не может быть больше 1 000 000 000 000 000.00"];
	return []
}