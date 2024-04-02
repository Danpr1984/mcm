import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";
import HomePage from "../pages/HomePage.jsx";
import PlaylistPage from "../pages/PlaylistPage.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/playlist/:slug" element={<PlaylistPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
