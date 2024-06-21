import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../store/auth";

export default function AuthRedirect() {
  const { userData: data } = useAuth();

  let content;
  if (!data || data === undefined) content = <Outlet />;
  else content = <Navigate to={"/app"} replace />;
  return content;
}
