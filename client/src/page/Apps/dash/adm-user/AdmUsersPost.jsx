import { useState } from "react";
import { Input, Label } from "../../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Title } from "../../../../components/Components";
import { useUser } from "../../../../store/user";

const AdmUsersPost = () => {
  const { postUser, getUsers, loadPage } = useUser();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(data).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getUsers();
        navigate(-1);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div>
      <Title>Post User</Title>
      <form onSubmit={handleSubmit} className="border rounded-lg p-2">
        <Label id="username">username</Label>
        <Input id="username" autoFocus={true} placeholder={"username"} onChange={handleChange} />
        <Label id="email">email</Label>
        <Input type="email" id="email" placeholder={"email"} onChange={handleChange} />
        <Label id="password">password</Label>
        <Input type="password" id="password" placeholder={"password"} onChange={handleChange} />
        <Label id="confPassword">Confirm Password</Label>
        <Input type="password" id="confPassword" placeholder={"Confirm Password"} onChange={handleChange} />
        <button
          type="submit"
          className="w-20 p-1 rounded bg-cyan-500 hover:opacity-70 text-white flex items-center justify-center"
        >
          {loadPage ? (
            <div className="text-2xl animate-spin">
              <PiSpinner />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdmUsersPost;
