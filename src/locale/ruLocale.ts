const ru = new Map<string, string>();

ru.set(
	"INCOME",
	"Доход"
);

ru.set(
	"EXPENSE",
	"Расход"
);

ru.set(
	"Unknown error",
	"Неизвестная ошибка."
)

ru.set(
	"Validation failed",
	"Проверьте правильность введенных данных."
);

ru.set(
	"Authentication failed",
	"Не удалось войти. Проверьте правильность введенных данных."
);

ru.set(
	"User not found",
	"Пользователь не найден."
);

ru.set(
	"User with this email already exists",
	"Пользователь с таким адресом электронной почты уже существует."
);

ru.set(
	"Account has transactions and cannot be deleted",
	"Аккаунт не может быть удалён, так как он используется в существующих транзакциях."
);

ru.set(
	"Category has transactions and cannot be deleted",
	"Категория не может быть удалена, так как она используется в существующих транзакциях."
);

export const ruLocale = (str: string): string => {
	return ru.get(str) ?? str;
}