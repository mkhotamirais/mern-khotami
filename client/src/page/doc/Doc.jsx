import { Outlet } from "react-router-dom";
import { Title } from "../../components/Components";

export default function Doc() {
  return (
    <div className="">
      <Title type="aside">Doc</Title>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
