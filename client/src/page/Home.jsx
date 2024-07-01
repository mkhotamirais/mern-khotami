import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-800 flex-grow flex-shrink h-[calc(100vh-8rem)] flex flex-col gap-6 items-center justify-center px-3 lg:px-16">
      <h1 className="font-playfairDisplay text-4xl sm:text-5xl text-center">Welcome to Mern Khotami</h1>
      <div className="p-3 flex flex-col sm:flex-row gap-3 *:w-40 *:text-center *:rounded-full *:p-2 sm:*:p-3">
        <Link to="app" className="bg-blue-400 border-blue-300 text-white hover:scale-105 transition-all duration-150">
          Shop Now
        </Link>
        <Link to="doc" className="border border-blue-400 hover:scale-105 transition-all duration-150">
          Documentation
        </Link>
      </div>
    </div>
  );
}
