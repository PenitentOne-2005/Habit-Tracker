import type { Habit } from "@/shared/api";

export interface HabitItemProps {
  habit: Habit;
  done: boolean;
}
