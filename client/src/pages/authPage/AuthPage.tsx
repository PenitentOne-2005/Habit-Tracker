import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AuthFormData } from "./interface";
import { useAuth } from "@/context";
import { login, register as registerApi } from "@/api";
import { Input } from "@/components";
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-label={isLogin ? "Форма входа" : "Форма регистрации"}
        >
          <div className={styles.field}>
            <Input
              placeholder="Имя"
              aria-label="Имя"
              error={errors.name?.message}
              {...register("name", { required: "Обязательное поле" })}
            />
          </div>

          <div className={styles.field}>
            <Input
              type="password"
              placeholder="Пароль"
              aria-label="Пароль"
              error={errors.password?.message}
              {...register("password", {
                required: "Обязательное поле",
                minLength: { value: 8, message: "Минимум 8 символов" },
              })}
            />
          </div>

          {errors.root && (
            <span className={styles.rootError} role="alert" aria-live="polite">
              {errors.root.message}
            </span>
          )}

          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
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
