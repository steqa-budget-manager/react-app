export const toCents = (val: string): bigint => BigInt(Math.round(parseFloat(val) * 100));

export function fromCents(centsInput: bigint | number): string {
	const cents = BigInt(centsInput);
	const isNegative = cents < 0n;
	const abs = isNegative ? -cents : cents;

	const rublesBI = abs / 100n;
	const kopecksBI = abs % 100n;

	const rublesStr = rublesBI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	const kopecksStr = kopecksBI.toString().padStart(2, "0");

	const formatted = kopecksBI > 0 ? `${rublesStr}.${kopecksStr}` : `${rublesStr}`;
	return isNegative ? `-${formatted}` : formatted;
}
