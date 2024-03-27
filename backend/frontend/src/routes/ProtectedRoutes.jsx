import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProtectedRoutes = () => {
  const { loadingUser, user } = useContext(AuthContext);

  return (
    <>
      {loadingUser && (
        <section className="flex h-[calc(100vh-64px)]  flex-1 items-center justify-center bg-indigo-600">
          <LoadingSpinner />
        </section>
      )}
      <>
        {!loadingUser && (
          <> {!loadingUser && user ? <Outlet /> : <Navigate to="/" />}</>
        )}
      </>
    </>
  );
};

export default ProtectedRoutes;
