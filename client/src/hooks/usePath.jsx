import { useLocation } from "react-router-dom";

export default function usePath() {
  const location = useLocation();
  const path = location.pathname.split("/");
  return { path };
}
