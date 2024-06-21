import { useAuth } from "../../../store/auth";

export default function Dash() {
  const { userData } = useAuth();
  return (
    <div>
      Dashboard
      <div>welcome {userData?.username}</div>
    </div>
  );
}
