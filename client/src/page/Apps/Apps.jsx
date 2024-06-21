import { Outlet } from "react-router-dom";
import { Title } from "../../components/Components";
import AuthBtn from "./auth/AuthBtn";
import { Toaster } from "react-hot-toast";

export default function Apps() {
  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center">
        <Title type="aside">Apps</Title>
        <AuthBtn />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
Apps.propTypes;
