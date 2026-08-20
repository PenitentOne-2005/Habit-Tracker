import { Habits } from "@/features";
import styles from "./HabitsPage.module.css";

const HabitsPage = () => {
  return (
    <main className={styles.page}>
      <Habits />
    </main>
  );
};

export default HabitsPage;
