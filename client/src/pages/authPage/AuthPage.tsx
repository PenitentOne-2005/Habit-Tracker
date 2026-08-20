import { AuthForm } from "@/features";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <main className={styles.wrapper}>
      <AuthForm />
    </main>
  );
};

export default AuthPage;
