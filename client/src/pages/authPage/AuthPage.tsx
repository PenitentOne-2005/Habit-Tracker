import { AuthForm } from "@/features";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <main className={styles.wrapper} aria-labelledby="auth-title">
      <AuthForm />
    </main>
  );
};

export default AuthPage;
