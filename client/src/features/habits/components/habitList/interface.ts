import type { Habit } from "@/shared/api";

export interface HabitListProps {
  habits: NoInfer<Habit[]> | undefined;
}
