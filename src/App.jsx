import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import UsersPage from "./pages/UsersPage";
import { useAppProvider } from "./hooks/useAppProvider";
import LoginPage from "./pages/LoginPage";
import { UserTableComponent } from "./components/user/UserTable";
import { ComponentBuuton } from "./components/user/BuutonUser";

function App() {
  const Providers = useAppProvider;

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tableUsers" element={<UserTableComponent />} />
        <Route path="/users" element={<PrivateRoute component={UsersPage} />} />
      </Routes>
    </Providers>
  );
}

export default App;
