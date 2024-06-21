import { FaCartShopping, FaRightToBracket, FaTags, FaUserGroup, FaUserPlus, FaUserGear, FaList } from "react-icons/fa6";

// export const url = "http://localhost:5000/api/khotami-mern";
export const url = "https://mern-khotami-server.vercel.app/api/khotami-mern";

// nav
export const navMenus = [
  { href: "/", label: "Home" },
  { href: "/doc", label: "Doc" },
  { href: "/app", label: "App" },
];

// aside
export const docMenus = [
  { href: "1", label: "doc1" },
  { href: "2", label: "doc2" },
];

export const appsMenus = [
  { href: "/app/product", label: "shop" },
  { href: "/app/kamus", label: "kamus" },
];

// auth
export const authUserMenus = [{ href: "user-profile", label: "profile", icon: FaUserGear }];

export const authAdminMenus = [
  { href: "adm-profile", label: "profile", icon: FaUserGear },
  { href: "adm-user", label: "user", icon: FaUserGroup },
  { href: "adm-product", label: "product", icon: FaCartShopping },
  { href: "adm-category", label: "category", icon: FaList },
  { href: "adm-tags", label: "tags", icon: FaTags },
];

export const authLoginMenus = [
  { href: "login", label: "login", icon: FaRightToBracket },
  { href: "register", label: "register", icon: FaUserPlus },
];
