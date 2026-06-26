import { api, ApiRoutes } from "../index";
import type { CompletionData, CreateHabitPayload, Habit } from "./interface";

export const getHabits = () => api.get<Habit[]>(ApiRoutes.habits);

export const createHabit = (data: CreateHabitPayload) =>
  api.post<Habit>(ApiRoutes.habits, data);

export const completeHabit = (id: number) =>
  api.post<Habit>(`${ApiRoutes.habits}/${id}/complete`);

export const getCompletions = () =>
  api.get<CompletionData[]>(ApiRoutes.habitsCompletions);

export const deleteHabit = (id: number) =>
  api.delete(`${ApiRoutes.habits}/${id}`);
