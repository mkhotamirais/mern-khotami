import { FaRightToBracket, FaUser, FaUserShield } from "react-icons/fa6";
import { useBasic } from "../../../store/basic";
import { authAdminMenus, authLoginMenus, authUserMenus } from "../../../lib/data";
import { useAuth } from "../../../store/auth";
import { useEffect, useState } from "react";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import usePath from "../../../hooks/usePath";

export default function AuthBtn() {
  const { userData: data, getMe } = useAuth();
  useEffect(() => {
    getMe();
  }, [getMe]);

  let content;
  if (data?.role) {
    if (data?.role === "admin") content = <AdminBtn />;
    else if (data?.role === "user") content = <UserBtn />;
    else content = <LoginBtn />;
  } else content = <LoginBtn />;

  return content;
}

export const Bubble = ({ className, children, menus = [], origin = "origin-top-right" }) => {
  const { openBubble, removeOpenBubble } = useBasic();
  const [active, setActive] = useState();
  const { path } = usePath();
  useEffect(() => {
    setActive(path[2]);
  }, [path]);
  const handleClick = (href) => {
    removeOpenBubble();
    setActive(href);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        openBubble ? "scale-100" : "scale-0"
      } dark:bg-slate-900 bg-zinc-100 ${origin} ${className} absolute right-0 border p-3 py-2 rounded-lg shadow-lg transition-all duration-150`}
    >
      {menus.map((item) => (
        <Link
          onClick={() => handleClick(item?.href)}
          to={item.href}
          key={item.href}
          className={`${className} ${
            active === item?.href ? "text-cyan-500" : ""
          } flex items-center gap-2 hover:text-cyan-500 flex-grow py-2 border-b border-zinc-400 last:mb-2`}
        >
          {<item.icon />}
          {item.label}
        </Link>
      ))}
      {children}
    </div>
  );
};
Bubble.propTypes;

export const AuthBubble = ({ icon, menus, withLogout = true }) => {
  const { toggleOpenBubble } = useBasic();
  const handleClick = () => {
    toggleOpenBubble();
  };
  return (
    <div className="relative">
      <button onClick={handleClick} className="text-xl">
        {icon}
      </button>
      <Bubble menus={menus}>{withLogout && <LogoutBtn />}</Bubble>
    </div>
  );
};
AuthBubble.propTypes;

export const LoginBtn = () => <AuthBubble icon={<FaRightToBracket />} menus={authLoginMenus} withLogout={false} />;

export const UserBtn = () => <AuthBubble icon={<FaUser />} menus={authUserMenus} />;

export const AdminBtn = () => <AuthBubble icon={<FaUserShield />} menus={authAdminMenus} />;

export const LogoutBtn = () => {
  const { signout, getMe, loadOut } = useAuth();
  const { removeOpenBubble } = useBasic();
  const navigate = useNavigate();
  const handleClick = () => {
    signout().then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getMe();
        removeOpenBubble();
        navigate("/app");
      } else toast.error(res.message);
    });
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 text-sm w-full items-center justify-center border rounded-lg p-2 px-2 mt-2 bg-slate-500 text-white hover:opacity-70"
    >
      {loadOut ? (
        <div className="text-xl">
          <PiSpinner className="animate-spin" />
        </div>
      ) : (
        <>
          <FaRightToBracket /> Logout
        </>
      )}
    </button>
  );
};
