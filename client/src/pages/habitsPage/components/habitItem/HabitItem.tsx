import type { HabitItemProps } from "./interface";
import { useCompleteHabit, useDeleteHabit } from "@/pages/habitsPage/hooks";
import styles from "./HabitItem.module.css";

const HabitItem = ({ habit, done }: HabitItemProps) => {
  const completeHabit = useCompleteHabit();
  const deleteHabit = useDeleteHabit();

  return (
    <li key={habit.id} className={styles.card}>
      <div className={styles.cardInfo}>
        <span className={styles.habitTitle}>{habit.title}</span>

        {habit.description && (
          <span className={styles.habitDescription}>{habit.description}</span>
        )}
        <span className={styles.streak}>🔥 {habit.streak} дней</span>
      </div>

      <div className={styles.cardActions}>
        <button
          type="button"
          onClick={() => completeHabit.mutate(habit.id)}
          disabled={done || completeHabit.isPending}
          className={styles.completeBtn}
          aria-label={`Отметить привычку ${habit.title} как выполненную`}
        >
          {done ? "✓ Выполнено" : "Отметить"}
        </button>
        <button
          type="button"
          onClick={() => deleteHabit.mutate(habit.id)}
          className={styles.deleteBtn}
          aria-label={`Удалить привычку ${habit.title}`}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default HabitItem;
