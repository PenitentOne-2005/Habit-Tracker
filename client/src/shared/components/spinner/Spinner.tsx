import type { SpinnerProps } from "./interface";
import styles from "./Spinner.module.css";

const Spinner = ({ label = "Загрузка..." }: SpinnerProps) => {
  return (
    <div role="status" className={styles.wrapper}>
      <div className={styles.spinner} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
