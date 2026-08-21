import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AuthFormData } from "./interface";
import { login, register as registerApi } from "./api";
import { useAuth } from "@/shared/hooks";
import { Input } from "@/shared/components";
import styles from "./AuthForm.module.css";

const AuthForm = () => {
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
    <div className={styles.card}>
      <h1 className={styles.title} aria-live="polite" id="auth-title">
        {isLogin ? "Войти" : "Регистрация"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label={isLogin ? "Форма входа" : "Форма регистрации"}
        aria-describedby={errors.root ? "root-error" : undefined}
        noValidate
      >
        <div className={styles.field}>
          <Input
            label="Имя"
            placeholder="Имя"
            autoComplete="username"
            disabled={isSubmitting}
            error={errors.name?.message}
            {...register("name", { required: "Обязательное поле" })}
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Пароль"
            type="password"
            placeholder="Пароль"
            autoComplete={isLogin ? "current-password" : "new-password"}
            disabled={isSubmitting}
            error={errors.password?.message}
            {...register("password", {
              required: "Обязательное поле",
              minLength: { value: 8, message: "Минимум 8 символов" },
            })}
          />
        </div>

        {errors.root && (
          <span
            id="root-error"
            className={styles.rootError}
            role="alert"
            aria-live="polite"
          >
            {errors.root.message}
          </span>
        )}

        <button
          className={styles.button}
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <span aria-live="polite">
            {isSubmitting
              ? "Загрузка..."
              : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
          </span>
        </button>
      </form>

      <div className={styles.toggle}>
        {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <button
          className={styles.toggleButton}
          type="button"
          onClick={toggleMode}
          aria-label={
            isLogin
              ? "Переключиться на форму регистрации"
              : "Переключиться на форму входа"
          }
        >
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
