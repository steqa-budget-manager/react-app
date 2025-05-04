export const formattedDate = (date: Date) => {
	return date.toLocaleDateString("ru", {
		day: "numeric",
		month: "long",
		year: "numeric",
	} as const).replace(/г\./, "");
}