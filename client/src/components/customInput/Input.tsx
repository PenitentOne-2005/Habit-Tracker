import type { InputProps } from "./interface";
import styles from "./Input.module.css";

const Input = ({ error, ...props }: InputProps) => {
  const errorId = "input-error";

  return (
    <>
      <input
        className={styles.input}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </>
  );
};

export default Input;
