import { useNavigate } from "react-router-dom";
import { Input, Label } from "../../../components/Tags";
import { AuthLayout } from "./AuthLayout";
import { useState } from "react";
import { useAuth } from "../../../store/auth";
import toast from "react-hot-toast";

export default function Login() {
  const { signin, getMe } = useAuth();
  const isLoading = false;
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(data).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getMe();
        navigate("..");
      } else toast.error(res.message);
    });
  };

  return (
    <div>
      <AuthLayout onSubmit={handleSubmit} title="login" isLoading={isLoading}>
        <Label id="username">username</Label>
        <Input
          id="username"
          autoFocus={true}
          placeholder={"username"}
          onChange={handleChange}
        />
        <Label id="password">password</Label>
        <Input
          type="password"
          id="password"
          placeholder={"password"}
          onChange={handleChange}
        />
      </AuthLayout>
    </div>
  );
}
