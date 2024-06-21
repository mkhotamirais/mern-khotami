import { useEffect, useState } from "react";
import { Err, Loading, Title } from "../../../../components/Components";
import { Input, Label, Select } from "../../../../components/Tags";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { useUser } from "../../../../store/user";

export default function AdmUsersUpdate() {
  const { updateUser, getUserById, singleData: data, getUsers, loadUpdate, loadPage, errPage } = useUser();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [editPass, setEditPass] = useState(false);

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id, getUserById]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUsername(data?.username);
      setEmail(data?.email);
      setRole(data?.role);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = { username, email, role };
    if (password) result = { ...result, password, confPassword };
    updateUser(id, result).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getUsers();
        navigate(-1);
      } else {
        toast.error(res.message);
      }
    });
  };

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    content = (
      <div>
        <Title>Update User</Title>
        <form onSubmit={handleSubmit} className="border rounded-lg p-2">
          <Label id="username">username</Label>
          <Input
            id="username"
            autoFocus={true}
            placeholder={"username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label id="email">email</Label>
          <Input
            type="email"
            id="email"
            placeholder={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={() => setEditPass((prev) => !prev)} className="underline">
            {editPass ? "Hide" : "Edit"} Password
          </button>
          {editPass && (
            <div>
              <Label id="password">password</Label>
              <Input
                type="password"
                id="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label id="confPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confPassword"
                placeholder={"Confirm Password"}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          )}
          <Label id="role">role</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <button
            type="submit"
            className="w-20 p-1 rounded bg-cyan-500 hover:opacity-70 text-white flex items-center justify-center"
          >
            {loadUpdate ? (
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
  }

  return content;
}
