const ru = new Map<string, string>();

ru.set(
	"Unknown error",
	"Неизвестная ошибка."
)

ru.set(
	"Validation failed",
	"Проверьте правильность введенных данных."
);

ru.set(
	"User not found",
	"Пользователь не найден."
);

export const ruLocale = (str: string): string => {
	return ru.get(str) ?? str;
}