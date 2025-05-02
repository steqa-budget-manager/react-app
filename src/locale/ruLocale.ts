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

ru.set(
	"User with this email already exists",
	"Пользователь с таким адресом электронной почты уже существует."
);


export const ruLocale = (str: string): string => {
	return ru.get(str) ?? str;
}