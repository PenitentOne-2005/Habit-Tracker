import { useForm } from "react-hook-form";
import type { HabitFormData } from "./interface";
import { useAuth } from "@/context";
import { HabitHeatmap, Input } from "@/components";
import { isCompletedToday } from "./utils";
import {
  useHabits,
  useCompletions,
  useCreateHabit,
  useCompleteHabit,
  useDeleteHabit,
} from "./hooks";
import styles from "./HabitsPage.module.css";

const HabitsPage = () => {
  const { logout } = useAuth();

  const { data: habits, isLoading } = useHabits();
  const { data: completions } = useCompletions();

  const createHabit = useCreateHabit();
  const completeHabit = useCompleteHabit();
  const deleteHabit = useDeleteHabit();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HabitFormData>();

  const onSubmit = (data: HabitFormData) => {
    createHabit.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  if (isLoading)
    return (
      <div role="status" aria-label="Загрузка">
        Загрузка...
      </div>
    );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мои привычки</h1>
        <button type="button" onClick={logout} className={styles.logoutBtn}>
          Выйти
        </button>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Добавить привычку"
      >
        <div>
          <Input
            placeholder="Имя"
            aria-label="Имя"
            error={errors.title?.message}
            {...register("title", { required: "Обязательное поле" })}
          />
        </div>

        <div>
          <Input
            aria-label="Описание"
            placeholder="Описание (необязательно)"
            {...register("description")}
          />
        </div>

        <button
          type="submit"
          disabled={createHabit.isPending}
          className={styles.addBtn}
        >
          {createHabit.isPending ? "Создание..." : "Добавить"}
        </button>
      </form>

      <ul className={styles.list}>
        {habits?.length === 0 && (
          <li className={styles.empty}>Нет привычек. Добавь первую!</li>
        )}

        {habits?.map((habit) => {
          const done = isCompletedToday(habit.lastCompletedAt);

          return (
            <li key={habit.id} className={styles.card}>
              <div className={styles.cardInfo}>
                <span className={styles.habitTitle}>{habit.title}</span>

                {habit.description && (
                  <span className={styles.habitDescription}>
                    {habit.description}
                  </span>
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
        })}
      </ul>

      <div className={styles.heatmapSection}>
        <h2 className={styles.sectionTitle}>Активность</h2>
        <div className={styles.heatmapWrapper}>
          {completions && <HabitHeatmap completions={completions} />}
        </div>
      </div>
    </main>
  );
};

export default HabitsPage;
