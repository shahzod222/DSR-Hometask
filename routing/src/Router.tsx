import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import NotFound from "./NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
