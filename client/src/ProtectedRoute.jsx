import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuntContext";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuth, loading } = useAuth();

  if(loading) return <h2>Loading...</h2>

  if ( !loading && !isAuth) {
    navigate("/login");
  }

  return <Outlet />;
}
