import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useBasic } from "./store/basic";
import { useEffect } from "react";
import { AsideCollapse, AsideMain } from "./components/Aside";
import usePath from "./hooks/usePath";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { openBubble, removeOpenBubble, openAside, removeOpenAside, openNav, removeOpenNav } = useBasic();
  const { path } = usePath();
  const handleClick = () => {
    if (openNav) removeOpenNav();
    if (openAside) removeOpenAside();
    if (openBubble) removeOpenBubble();
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (openNav) removeOpenNav();
      if (openAside) removeOpenAside();
      if (openBubble) removeOpenBubble();
    });
  }, [openNav, removeOpenNav, openAside, removeOpenAside, openBubble, removeOpenBubble]);
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-slate-800 dark:text-white">
      <Header />
      <main onClick={handleClick} className="flex-grow flex-shrink px-3 lg:px-16">
        {!path[1] || path[1] === "" || path[1] === "home" ? (
          <section>
            <Outlet />
          </section>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5">
            <AsideMain className={"col-span-1"} />
            <section className="col-span-1 sm:col-span-3 lg:col-span-4">
              <Outlet />
            </section>
          </div>
        )}
        <AsideCollapse />
      </main>
      <Footer />
      <Toaster />
    </main>
  );
}
