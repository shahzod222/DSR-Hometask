import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useUser } from "./UserContext";
import Main from "./components/Main";
import Users from "./components/Users";
import NotFoundPage from "./components/notFound";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { isUser } = useUser();

  if (!isUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ redirectPath = "/main" }) => {
  const { isUser } = useUser();

  if (isUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
