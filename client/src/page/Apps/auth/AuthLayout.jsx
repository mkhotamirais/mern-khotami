import { PiSpinner } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Title } from "../../../components/Components";

export function AuthLayout({ children, onSubmit, title = "login", isLoading }) {
  return (
    <div className="w-full h-[calc(100vh-12rem)] flex items-center justify-center">
      <div
        className={`dark:bg-slate-900 bg-white w-full mx-3 p-3 sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg shadow-md border`}
      >
        <Title>{title}</Title>
        <form onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="bg-blue-500 text-white p-1 w-20 rounded-lg hover:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="text-2xl">
                <PiSpinner className="animate-spin" />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {title === "login" && (
          <p className="mt-3">
            Do not have an account ?{" "}
            <Link to="../register" className="text-blue-500 hover:unerline">
              register
            </Link>
          </p>
        )}
        {title === "register" && (
          <p className="mt-3">
            Already have an account ?{" "}
            <Link to="../login" className="text-blue-500 hover:unerline">
              login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
AuthLayout.propTypes;
