# Habit Tracker

A habit-tracking app with a GitHub-style activity heatmap.

## Stack

**Backend:** NestJS, TypeORM, PostgreSQL, JWT  
**Frontend:** React, Vite, React Query, Chart.js

## Launch

### Requirements
- Node.js 18+
- Docker

### 1. Clone the repository
```bash
git clone https://github.com/PenitentOne-2005/Habit-Tracker.git
cd Habit-Tracker
```

### 2. Bring up the database.
```bash
docker-compose up -d
```

### 3. Set up the backend
```bash
cd server
cp .env.example .env  # fill in with your own values
npm install
npm run start:dev
```

### 4. Start the frontend.
```bash
cd client
npm install
npm run dev
```

The app is available on `http://localhost:5173`

## Functionality

- Registration and authorization via JWT
- Forming and breaking habits
- Completion mark with streak count
- Activity heatmap for the past year
