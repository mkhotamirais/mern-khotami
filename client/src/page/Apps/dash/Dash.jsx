import { useAuth } from "../../../store/auth";

export default function Dash() {
  const { userData } = useAuth();
  return (
    <div>
      Dashboard
      <div>welcome {userData?.username}</div>
      {/* <p>
        masalah cookie(sameSite: none/lax): this attempt to set a cookie via a Set-Cookie header was blocked becaues it
        had the SameSite=Lax attribut but came from a cross-site response which was not the response to a top-level
        navigation.
      </p>
      <p>jika sameSite=none maka akan muncuk peringatan:</p> */}
    </div>
  );
}
