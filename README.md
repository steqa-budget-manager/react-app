[ru](https://github.com/steqa-cashcache/react-app) [en](https://github.com/steqa-cashcache/.github/blob/main/locale/react-app/README.en.md)

# CashCache :coin: React App
:warning: Этот репозиторий является частью проекта [CashCache](https://github.com/steqa-cashcache) :warning:  
Для информации по установке и запуску см. [основной README](https://github.com/steqa-cashcache)


![GitHub Release](https://img.shields.io/github/v/release/steqa-cashcache/react-app)
![License](https://img.shields.io/badge/license-MIT-green)


![TypeScript](https://img.shields.io/badge/TypeScript-017acc?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-49aabf?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-671ddf?style=flat&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

## Содержание
1. [Описание](#описание)
2. [Особенности](#особенности)
3. [Структура проекта](#структура-проекта)
4. [Демонстрация интерфейса](#демонстрация-интерфейса)
5. [Лицензия](#лицензия)


## Описание
Веб-интерфейс к системе управления личными финансами CashCache.  
Позволяет управлять счетами, транзакциями, шаблонами, а также настраивать регулярные операции через удобный UI.


## Особенности
- JSON Web Token хранится в `localStorage`
- После входа токен используется в Authorization-заголовках для всех запросов
- Интеграция с [backend API](https://github.com/steqa-cashcache/api) по REST
- Интерактивные формы для CRUD операций
- Использование современного стека: React, TypeScript, Vite
- Адаптивный дизайн для мобильных и десктопов


## Структура проекта
```
src
├── api                # API-слой: запросы, схемы типов, конфиг axios
│   ├── requests       # Конкретные запросы по сущностям (account, auth, category, transaction и др.)
│   └── schemas        # Типы и схемы данных для API
├── blocks             # Блоки — крупные UI-компоненты с логикой и стилями
├── components         # Мелкие переиспользуемые UI-компоненты
├── contexts           # React context для авторизации
├── hooks              # Кастомные React-хуки (useHttpRequest, useValidator и др.)
├── locale             # Локализация (например, русская локаль для ошибок)
├── pages              # Страницы приложения
├── routers            # Конфигурация React Router
├── utils              # Вспомогательные функции (работа с датами, деньгами и др.)
└── validators         # Функции валидации (email, дата, пароль и др.)
```


## Демонстрация интерфейса
### Скриншоты
![Примеры интерфейса](https://github.com/steqa-cashcache/.github/blob/main/media/interface.png?raw=true)

### Вход
![Вход](https://github.com/steqa-cashcache/.github/blob/main/media/login.gif?raw=true)

### Добавление, изменение, удаление дохода
![Добавление, изменение, удаление дохода](https://github.com/steqa-cashcache/.github/blob/main/media/income.gif?raw=true)

### Добавление, изменение, удаление расхода
![Добавление, изменение, удаление расхода](https://github.com/steqa-cashcache/.github/blob/main/media/expense.gif?raw=true)

### Добавление, изменение, удаление перевода
![Добавление, изменение, удаление расхода](https://github.com/steqa-cashcache/.github/blob/main/media/transfer.gif?raw=true)

### Страница аккаунтов
![Страница аккаунтов](https://github.com/steqa-cashcache/.github/blob/main/media/account.gif?raw=true)

### Добавление, изменение, удаление аккаунта
![Добавление, изменение, удаление аккаунта](https://github.com/steqa-cashcache/.github/blob/main/media/account.gif?raw=true)

### Добавление, изменение, удаление категории
![Добавление, изменение, удаление категории](https://github.com/steqa-cashcache/.github/blob/main/media/category-settings.gif?raw=true)

### Добавление, изменение, удаление шаблона транзакции
![Добавление, изменение, удаление шаблона транзакции](https://github.com/steqa-cashcache/.github/blob/main/media/transaction-template-settings.gif?raw=true)

### Добавление, изменение, удаление регулярной транзакции
![Добавление, изменение, удаление регулярной транзакции](https://github.com/steqa-cashcache/.github/blob/main/media/transaction-template-settings.gif?raw=true)


## Лицензия
Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](LICENSE).
