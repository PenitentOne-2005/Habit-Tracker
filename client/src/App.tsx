import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./shared/hooks";
import { Spinner } from "./shared/components";

const AuthPage = lazy(() => import("./pages/authPage"));
const HabitsPage = lazy(() => import("./pages/habitsPage"));

const App = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/auth"
            element={!token ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={token ? <HabitsPage /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
