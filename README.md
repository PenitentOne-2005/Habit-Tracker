# Habit Tracker

Приложение для отслеживания привычек с GitHub-style heatmap активности.

## Стек

**Backend:** NestJS, TypeORM, PostgreSQL, JWT  
**Frontend:** React, Vite, React Query, Chart.js

## Запуск

### Требования
- Node.js 18+
- Docker

### 1. Клонируй репозиторий
```bash
git clone https://github.com/PenitentOne-2005/Habit-Tracker.git
cd habit-tracker
```

### 2. Подними базу данных
```bash
docker-compose up -d
```

### 3. Настрой бекенд
```bash
cd server
cp .env.example .env  # заполни своими значениями
npm install
npm run start:dev
```

### 4. Запусти фронтенд
```bash
cd client
npm install
npm run dev
```

Приложение доступно на `http://localhost:5173`

## Функциональность

- Регистрация и авторизация через JWT
- Создание, удаление привычек
- Отметка выполнения с подсчётом streak
- Heatmap активности за последний год
