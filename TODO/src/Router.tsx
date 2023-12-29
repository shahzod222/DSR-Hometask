import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useUser } from "./UserContext";
import { Box, Heading, Spinner } from "@chakra-ui/react";
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
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Spinner size="xl" color="teal.500" marginRight="2" />
        <Heading as="h2" size="lg">
          Loading...
        </Heading>
      </Box>
    );
  }

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
