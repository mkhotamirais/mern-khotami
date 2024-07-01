import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import usePath from "../hooks/usePath";
import { appsMenus, docMenus } from "../lib/data";
import { NavLink } from "react-router-dom";
import { useBasic } from "../store/basic";

export const AsideBtn = ({ className }) => {
  const { toggleOpenAside } = useBasic();
  const handleClick = () => {
    toggleOpenAside();
  };
  return (
    <button onClick={handleClick} className={`${className} text-blue-500 block sm:hidden`}>
      <TbLayoutSidebarRightCollapse />
    </button>
  );
};
AsideBtn.propTypes;

export const AsideContent = ({ className }) => {
  const { path } = usePath();
  const { openAside, removeOpenAside } = useBasic();
  const handleClick = () => {
    if (openAside) removeOpenAside();
  };
  let menus;
  if (path[1] === "doc") menus = docMenus;
  else if (path[1] === "app") menus = appsMenus;
  return menus?.map((item) => (
    <NavLink
      to={item.href}
      key={item.href}
      onClick={handleClick}
      className={`${className} hover:opacity-70 capitalize`}
    >
      {item.label}
    </NavLink>
  ));
};
AsideContent.propTypes;
export const AsideMain = ({ className }) => {
  return (
    <div className={`hidden sm:flex flex-col ${className}`}>
      <AsideContent />
    </div>
  );
};
AsideMain.propTypes;

export const AsideCollapse = ({ className }) => {
  const { openAside } = useBasic();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        openAside ? "scale-x-full" : "scale-x-0"
      } origin-left flex sm:hidden ${className} fixed flex-col p-3 border-r rounded-r-lg w-2/3 top-16 bottom-0 left-0 bg-blue-900 transition-all duration-150`}
    >
      <AsideContent className={`py-2 bg-blue-400 rounded-lg mb-1 text-white px-3`} />
    </div>
  );
};
AsideCollapse.propTypes;
