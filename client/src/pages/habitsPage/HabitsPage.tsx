import { useForm } from "react-hook-form";
import type { HabitFormData } from "./interface";
import { useAuth } from "@/context";
import { useHabits, useCompletions, useCreateHabit } from "./hooks";
import { Input, Spinner } from "@/components";
import { HabitHeatmap, HabitList } from "./components";
import styles from "./HabitsPage.module.css";

const HabitsPage = () => {
  const { logout } = useAuth();

  const { data: habits, isLoading } = useHabits();
  const { data: completions } = useCompletions();

  const createHabit = useCreateHabit();

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
    return <Spinner />;

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

      <HabitList habits={habits} />

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
