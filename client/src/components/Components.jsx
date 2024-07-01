import { Link, useNavigate } from "react-router-dom";
import { AsideBtn } from "./Aside";
import { FaChevronLeft, FaCircleInfo, FaIdCard, FaPenToSquare, FaTable, FaTrashCan, FaXmark } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";

export const Title = ({ className, children, type = "prev" }) => {
  return (
    <h1 className={`${className} font-playfairDisplay flex items-center text-2xl py-2 gap-1 capitalize`}>
      {type === "aside" ? <AsideBtn /> : type === "prev" ? <Prev /> : null}
      <span className={`${type === "aside" ? "font-semibold" : ""} text-lg`}>{children}</span>
    </h1>
  );
};
Title.propTypes;

export const Prev = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={`${className} text-lg text-blue-500`}>
      <FaChevronLeft />
    </button>
  );
};
Prev.propTypes;

export const Badge = ({ children, className = "bg-gray-500", onClick }) => {
  return (
    <span onClick={onClick} className={`${className} hover:bg-blue-500 inline rounded px-1 text-white text-xs`}>
      {children}
    </span>
  );
};
Badge.propTypes;

export const Loading = () => (
  <div className="text-2xl mt-5 flex justify-center">
    <PiSpinner className="animate-spin" />
  </div>
);

export const Err = ({ children, className }) => (
  <div className={`${className} italic mt-5 flex justify-center`}>{children}</div>
);
Err.propTypes;

export const ItemsCard = ({ children }) => {
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2">{children}</div>;
};
ItemsCard.propTypes;

export const Actions = ({ id, detail = true, update = true, del = true, onDel, className }) => {
  return (
    <div className={`${className} flex w-full`}>
      {detail && (
        <Link to={`detail/${id}`}>
          <FaCircleInfo className="text-blue-500 hover:opacity-70" />
        </Link>
      )}
      {update && (
        <Link to={`update/${id}`} className="text-green-500 hover:opacity-70">
          <FaPenToSquare />
        </Link>
      )}
      {del && (
        <button onClick={onDel} className="text-red-500 hover:opacity-70">
          <FaTrashCan />
        </button>
      )}
    </div>
  );
};
Actions.propTypes;

export const Modal = ({
  children,
  onClose,
  itemId,
  modalId,
  className,
  type = "detail",
  onDel = null,
  loadDel = null,
}) => {
  return (
    <div
      onClick={onClose}
      className={`${className} fixed inset-0 transition-all duration-150 ${
        itemId === modalId ? "z-50 bg-black bg-opacity-20" : "-z-50"
      } flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          itemId === modalId ? "scale-100" : "scale-0"
        } dark:bg-slate-900 bg-white origin-center rounded-lg p-3 w-full mx-3 shadow-lg sm:w-2/3 md:w/1/2 lg:w-1/3 transition-all duration-150`}
      >
        <div className="flex justify-between gap-2 mb-2 text-sm">
          <div>
            {type === "detail" ? "Detail" : type === "delete" ? "Delete" : null} ID:{modalId}
          </div>
          <button onClick={onClose} className="hover:text-red-500 text-xl">
            <FaXmark />
          </button>
        </div>
        {children}
        {type === "delete" && (
          <form onSubmit={onDel} className="relative flex gap-2 mt-2">
            {itemId === modalId && <input type="checkbox" autoFocus={true} className="absolute -z-50 opacity-0" />}
            <button
              type="submit"
              className="bg-red-500 p-1 text-white w-20 flex items-center justify-center rounded-lg hover:opacity-70"
            >
              {loadDel ? (
                <div className="text-xl animate-spin">
                  <PiSpinner />
                </div>
              ) : (
                "Delete"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-1 px-3 rounded-lg hover:opacity-70"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
Modal.propTypes;

export const ViewOption = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-2 text-blue-500 text-lg">
      <button
        onClick={() => setView("table")}
        disabled={view === "table"}
        className="ml-2 hover:scale-110 disabled:hover:scale-100 disabled:opacity-70"
      >
        <FaTable />
      </button>
      <button
        onClick={() => setView("card")}
        disabled={view === "card"}
        className="ml-2 hover:scale-110 disabled:hover:scale-100 disabled:opacity-70"
      >
        <FaIdCard />
      </button>
    </div>
  );
};
ViewOption.propTypes;
