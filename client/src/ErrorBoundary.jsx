import { useEffect } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useBasic } from "./store/basic";

const ErrorBoundary = () => {
  const error = useRouteError();
  const { theme } = useBasic();

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  let content;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <div>This page does not exist!</div>;
    } else if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    } else if (error.status === 503) {
      content = <div>Looks like our API is down</div>;
    } else if (error.status === 418) {
      content = <div>🫖</div>;
    }
  } else content = <div>Something went wrong</div>;

  return (
    <main className="min-h-screen dark:bg-slate-800 dark:text-white flex flex-col gap-3 items-center justify-center italic text-2xl sm:text-lg">
      {content}
      <Link to="/" className="underline text-sm">
        Back to Home
      </Link>
    </main>
  );
};

export default ErrorBoundary;
