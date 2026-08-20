export interface Habit {
  id: number;
  title: string;
  description: string | null;
  streak: number;
  lastCompletedAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateHabitPayload {
  title: string;
  description?: string;
}

export interface CompletionData {
  date: string;
  count: number;
}
