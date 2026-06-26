import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context";
import { AuthPage, HabitsPage } from "./pages";

const App = () => {
  const { token } = useAuth();

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
