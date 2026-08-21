import { memo } from "react";
import type { HabitItemProps } from "./interface";
import { useCompleteHabit, useDeleteHabit } from "@/features/habits/hooks";
import styles from "./HabitItem.module.css";

const HabitItem = ({ habit, done }: HabitItemProps) => {
  const completeHabit = useCompleteHabit();
  const deleteHabit = useDeleteHabit();

  return (
    <li className={styles.card}>
      <article className={styles.cardInfo}>
        <h3 className={styles.habitTitle}>{habit.title}</h3>

        {habit.description && (
          <p className={styles.habitDescription}>{habit.description}</p>
        )}

        <p className={styles.streak}>
          <span aria-hidden="true">🔥 </span>
          <span>{habit.streak} дней подряд</span>
        </p>
      </article>

      <div className={styles.cardActions}>
        <button
          type="button"
          onClick={() => completeHabit.mutate(habit.id)}
          disabled={done || completeHabit.isPending}
          aria-pressed={done}
          aria-busy={completeHabit.isPending}
          className={styles.completeBtn}
          aria-label={
            done
              ? `Привычка "${habit.title}" выполнена`
              : `Отметить привычку "${habit.title}" как выполненную`
          }
        >
          {done ? "✓ Выполнено" : "Отметить"}
        </button>

        <button
          type="button"
          onClick={() => deleteHabit.mutate(habit.id)}
          className={styles.deleteBtn}
          aria-label={`Удалить привычку "${habit.title}"`}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default memo(HabitItem);
