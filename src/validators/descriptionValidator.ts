export const descriptionValidator = (description?: string) => {
	if (!description) return [];
	if (description.length > 1000) return ["Максимальная длина 1000 символов."];
	return [];
}