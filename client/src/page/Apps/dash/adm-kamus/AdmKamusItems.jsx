import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AdmKamusModalDel from "./AdmKamusModalDel";

export default function AdmKamusItems({ item }) {
  const [idModalDel, setIdModalDel] = useState(null);
  const openModal = () => {
    setIdModalDel(item?._id);
  };
  const onClose = () => {
    setIdModalDel(null);
  };

  return (
    <div className="border rounded p-1 text-sm">
      <div>
        <span className="font-medium capitalize">{item?.name}</span> : {item?.meaning}
      </div>
      <div className="text-xs">
        Links:{" "}
        {item?.reference?.length > 0 ? (
          item?.reference?.map((itm, i) => (
            <div key={itm?._id} className="inline">
              <a href={itm?.refLink} className="text-cyan-500 hover:underline">
                {itm?.refName}
              </a>
              {i < item?.reference?.length - 1 ? " - " : null}
            </div>
          ))
        ) : (
          <span>-</span>
        )}
      </div>
      <div className="flex gap-3 mt-2">
        <Link to={`update/${item?._id}`} className="text-green-500 hover:opacity-70">
          <FaPenToSquare />
        </Link>
        <button onClick={openModal} className="text-red-500 hover:opacity-70">
          <FaTrashAlt />
        </button>
        <AdmKamusModalDel item={item} onClose={onClose} modalId={idModalDel} />
      </div>
    </div>
  );
}
AdmKamusItems.propTypes;
