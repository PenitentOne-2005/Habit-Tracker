import type { SpinnerProps } from "./interface";
import styles from "./Spinner.module.css";

const Spinner = ({ label = "Загрузка..." }: SpinnerProps) => {
  return (
    <div role="status" aria-label={label} className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Spinner;
