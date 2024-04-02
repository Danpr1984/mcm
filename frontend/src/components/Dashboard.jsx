import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Library from "./Library.jsx";

const Dashboard = () => {
  const { spotifyToken } = useContext(AuthContext);

  return <Library token={spotifyToken} />;
};

export default Dashboard;
