import { useForm } from "react-hook-form";
import type { HabitFormData } from "./interface";
import { useCompletions, useCreateHabit, useHabits } from "./hooks";
import { useAuth } from "@/shared/hooks";
import { Input, Spinner } from "@/shared/components";
import { HabitHeatmap, HabitList } from "./components";
import styles from "./Habits.module.css";

const Habits = () => {
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

  if (isLoading) return <Spinner label="Загрузка привычек..." />;

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title} id="habits-title">
          Мои привычки
        </h1>
        <button
          type="button"
          onClick={logout}
          className={styles.logoutBtn}
          aria-label="Выйти из аккаунта"
        >
          Выйти
        </button>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Добавить привычку"
        noValidate
      >
        <div>
          <Input
            label="Название"
            placeholder="Название привычки"
            error={errors.title?.message}
            {...register("title", { required: "Обязательное поле" })}
          />
        </div>

        <div>
          <Input
            label="Описание"
            placeholder="Описание (необязательно)"
            {...register("description")}
          />
        </div>

        <button
          type="submit"
          disabled={createHabit.isPending}
          aria-busy={createHabit.isPending}
          className={styles.addBtn}
        >
          {createHabit.isPending ? "Создание..." : "Добавить"}
        </button>
      </form>

      <HabitList habits={habits} />

      <div className={styles.heatmapSection}>
        <h2 className={styles.sectionTitle}>Активность</h2>

        <div
          className={styles.heatmapWrapper}
          aria-label="Тепловая карта активности по дням"
        >
          {completions && <HabitHeatmap completions={completions} />}
        </div>
      </div>
    </>
  );
};

export default Habits;
