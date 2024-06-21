import { useAuth } from "../../../../store/auth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdmin() {
  const { userData: data } = useAuth();
  let content;
  if (data && data?.role === "admin") content = <Outlet />;
  else if (data?.role === "" || data?.role === null || !data?.role) content = <Navigate to="/app" replace />;
  return content;
}

export function ProtectedUser() {
  const { userData: data } = useAuth();
  let content;
  if (data?.role === "user") content = <Outlet />;
  else if (data?.role === "" || data?.role === null || !data?.role) content = <Navigate to="/app" replace />;
  return content;
}
