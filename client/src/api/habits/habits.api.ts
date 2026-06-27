import { api, ApiRoutes } from "../index";
import type { CompletionData, CreateHabitPayload, Habit } from "./interface";

export const getHabits = () => api.get<Habit[]>(ApiRoutes.habits.list);

export const createHabit = (data: CreateHabitPayload) =>
  api.post<Habit>(ApiRoutes.habits.list, data);

export const completeHabit = (id: number) =>
  api.post<Habit>(ApiRoutes.habits.complete(id));

export const getCompletions = () =>
  api.get<CompletionData[]>(ApiRoutes.habits.completions);

export const deleteHabit = (id: number) => api.delete(ApiRoutes.habits.delete(id));
