import { FaBars, FaGithub, FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { useBasic } from "../store/basic";
import { useEffect, useState } from "react";
import { navMenus } from "../lib/data";
import { NavLink } from "react-router-dom";
import usePath from "../hooks/usePath";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 h-16 px-3 lg:px-16 flex justify-between items-center border-b shadow bg-white dark:bg-slate-800">
        <Logo />
        <NavMain />
        <div className="flex gap-3 items-center">
          <DarkMode />
          <SourceCode />
          <NavBtn />
        </div>
      </header>
      <NavCollapse />
    </>
  );
}

export const NavBtn = ({ className }) => {
  const { openBubble, removeOpenBubble, openAside, removeOpenAside, openNav, toggleOpenNav } = useBasic();
  const handleClick = () => {
    toggleOpenNav();
    if (openBubble) removeOpenBubble();
    if (openAside) removeOpenAside();
  };
  return (
    <button
      onClick={handleClick}
      className={`${className} block sm:hidden ${
        openNav ? "rotate-180" : ""
      } text-xl w-5 h-5 overflow-hidden transition-all duration-150`}
    >
      {openNav ? <FaXmark /> : <FaBars />}
    </button>
  );
};
NavBtn.propTypes;

export const NavContent = ({ className }) => {
  const { openNav, removeOpenNav } = useBasic();
  const { path } = usePath();
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(path[1]);
  }, [path]);
  const handleClick = () => {
    if (openNav) removeOpenNav();
    setActive(path[1]);
  };
  return navMenus.map((item) => (
    <NavLink
      key={item.href}
      to={item.href}
      onClick={handleClick}
      className={`${className} ${active === item.href.split("/")[1] ? "text-cyan-500" : ""} hover:text-cyan-500`}
    >
      {item.label}
    </NavLink>
  ));
};
NavContent.propTypes;

export const NavMain = ({ className }) => {
  return (
    <nav className={`hidden sm:flex ${className} w-full px-10 gap-5`}>
      <NavContent />
    </nav>
  );
};
NavMain.propTypes;

export const NavCollapse = ({ className }) => {
  const { openNav } = useBasic();
  return (
    <nav
      className={`z-50 flex flex-col sm:hidden p-3 ${
        openNav ? "scale-y-100" : "scale-y-0"
      } origin-top ${className} border-b rounded-b-lg fixed top-16 w-full bg-zinc-50 shadow-lg dark:bg-slate-900 transition-all duration-150`}
    >
      <NavContent className={`py-2 border-b last:mb-3`} />
    </nav>
  );
};
NavCollapse.propTypes;

export const DarkMode = ({ className }) => {
  const { theme, toggleTheme } = useBasic();

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <button onClick={toggleTheme} className={`${className} text-xl w-5 h-5 overflow-hidden`}>
      <FaMoon className={`${theme === "dark" ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
      <FaSun className={`${theme === "dark" ? "-translate-y-full" : "translate-y-0"} transition-all duration-150`} />
    </button>
  );
};
DarkMode.propTypes;

export const SourceCode = ({ className }) => {
  return (
    <a
      href="https://github.com/mkhotamirais/mern-khotami"
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} text-xl`}
    >
      <FaGithub />
    </a>
  );
};
SourceCode.propTypes;

export const Logo = ({ className }) => (
  <div className={`${className} flex flex-col gap-0 *:leading-none min-w-max`}>
    <div className="text-xl">Khotami</div>
    <div className="text-sm">Mern</div>
  </div>
);
Logo.propTypes;
