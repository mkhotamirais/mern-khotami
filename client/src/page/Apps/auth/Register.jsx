import { useState } from "react";
import { Input, Label } from "../../../components/Tags";
import { useAuth } from "../../../store/auth";
import { AuthLayout } from "./AuthLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const isLoading = false;
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(data).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        // getUsers();
        setData({});
        navigate("../login");
      } else toast.error(res.message);
    });
  };
  return (
    <div>
      <AuthLayout
        onSubmit={handleSubmit}
        title="register"
        isLoading={isLoading}
      >
        <Label id="username">username</Label>
        <Input
          id="username"
          autoFocus={true}
          placeholder={"username"}
          onChange={handleChange}
        />
        <Label id="email">email</Label>
        <Input
          type="email"
          id="email"
          placeholder={"email"}
          onChange={handleChange}
        />
        <Label id="password">password</Label>
        <Input
          type="password"
          id="password"
          placeholder={"password"}
          onChange={handleChange}
        />
        <Label id="confPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confPassword"
          placeholder={"Confirm Password"}
          onChange={handleChange}
        />
      </AuthLayout>{" "}
    </div>
  );
}
