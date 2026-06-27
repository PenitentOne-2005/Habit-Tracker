import type { Habit } from "@/api";

export interface HabitListProps {
  habits: NoInfer<Habit[]> | undefined;
}
