import { useForm } from "react-hook-form";
import type { HabitFormData } from "./interface";
import { useAuth } from "../../context";
import { isCompletedToday } from "./utils";
import {
  useHabits,
  useCompletions,
  useCreateHabit,
  useCompleteHabit,
  useDeleteHabit,
} from "./hooks";
import { HabitHeatmap } from "../../components";
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

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мои привычки</h1>
        <button type="button" onClick={logout} className={styles.logoutBtn}>
          Выйти
        </button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={styles.input}
            placeholder="Название привычки"
            {...register("title", { required: "Обязательное поле" })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <input
            className={styles.input}
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

      <div className={styles.list}>
        {habits?.length === 0 && <p>Нет привычек. Добавь первую!</p>}

        {habits?.map((habit) => {
          const done = isCompletedToday(habit.lastCompletedAt);

          return (
            <div key={habit.id} className={styles.card}>
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
                >
                  {done ? "✓ Выполнено" : "Отметить"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteHabit.mutate(habit.id)}
                  className={styles.deleteBtn}
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.heatmapSection}>
        <h2 className={styles.sectionTitle}>Активность</h2>
        <div className={styles.heatmapWrapper}>
          {completions && <HabitHeatmap completions={completions} />}
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
