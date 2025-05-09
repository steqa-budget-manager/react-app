export const toCents = (val: string): bigint => BigInt(Math.round(parseFloat(val) * 100));

export function fromCents(centsInput: bigint | number): string {
	const totalCents = BigInt(centsInput);
	const isNegative = totalCents < 0n;
	const absoluteCents = isNegative ? -totalCents : totalCents;

	const rubles = absoluteCents / 100n;
	const kopecks = absoluteCents % 100n;

	let result = rubles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

	if (kopecks > 0n) {
		let kopecksStr = kopecks.toString().padStart(2, "0");
		if (kopecksStr.endsWith("0")) {
			kopecksStr = kopecksStr.slice(0, 1);
		}
		result += `.${kopecksStr}`;
	}

	return isNegative ? `-${result}` : result;
}