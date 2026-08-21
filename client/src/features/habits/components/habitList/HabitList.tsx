import type { HabitListProps } from "./interface";
import { isCompletedToday } from "@/features/habits/utils";
import { HabitItem } from "../index";
import styles from "./HabitList.module.css";

const HabitList = ({ habits }: HabitListProps) => {
  return (
    <div aria-live="polite">
      <ul className={styles.list} aria-labelledby="habits-title">
        {habits?.length === 0 && (
          <li className={styles.empty}>Нет привычек. Добавь первую!</li>
        )}
        {habits?.map((habit) => {
          const done = isCompletedToday(habit.lastCompletedAt);

          return <HabitItem habit={habit} done={done} key={habit.id} />;
        })}
      </ul>
    </div>
  );
};

export default HabitList;
