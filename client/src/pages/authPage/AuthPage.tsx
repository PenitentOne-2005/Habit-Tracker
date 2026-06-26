import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AuthFormData } from "./interface";
import { useAuth } from "../../context";
import { login, register as registerApi } from "../../api";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({ mode: "onChange" });

  const onSubmit = async (data: AuthFormData) => {
    try {
      const res = isLogin ? await login(data) : await registerApi(data);

      setAuth(res.data.token, String(res.data.userId));
      navigate("/");
    } catch {
      setError("root", {
        message: isLogin
          ? "Неверное имя или пароль"
          : "Пользователь уже существует",
      });
    }
  };

  const toggleMode = () => {
    reset();
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? "Войти" : "Регистрация"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <input
              className={styles.input}
              placeholder="Имя"
              {...register("name", { required: "Обязательное поле" })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="password"
              placeholder="Пароль"
              {...register("password", { required: "Обязательное поле" })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          {errors.root && (
            <span className={styles.rootError}>{errors.root.message}</span>
          )}

          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Загрузка..."
              : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
          </button>
        </form>

        <p className={styles.toggle}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            className={styles.toggleButton}
            type="button"
            onClick={toggleMode}
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
