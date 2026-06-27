import type { HabitListProps } from "./interface";
import { isCompletedToday } from "@/pages/habitsPage/utils";
import { HabitItem } from "../index";
import styles from "./HabitList.module.css";

const HabitList = ({ habits }: HabitListProps) => {
  return (
    <ul className={styles.list}>
      {habits?.length === 0 && (
        <li className={styles.empty}>Нет привычек. Добавь первую!</li>
      )}

      {habits?.map((habit) => {
        const done = isCompletedToday(habit.lastCompletedAt);

        return <HabitItem habit={habit} done={done} />;
      })}
    </ul>
  );
};

export default HabitList;
