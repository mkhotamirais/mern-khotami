import toast from "react-hot-toast";
import { useCategory } from "../../../../store/category";
import { useState } from "react";
import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";
import AdmCategoryModalDel from "./AdmCategoryModalDel";

export default function AdmCategoryItems({ item }) {
  const [name, setName] = useState(item?.name);
  const {
    modalDelId,
    setModalDelId,
    editId,
    setEditId,
    updateCategory,
    getCategories,
    loadDelId,
    loadUpdateId,
  } = useCategory();

  const handleUpdate = () => {
    updateCategory(item?._id, { name }).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        setEditId(null);
        getCategories();
      } else toast.error(res.message);
    });
  };

  const handleSetEdit = () => {
    setEditId(item?._id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName(item?.name);
  };

  return (
    <div className="flex gap-5 justify-between items-center p-2 border-b">
      {editId === item._id ? (
        <input
          autoFocus
          type="text"
          value={name}
          onKeyUp={(e) => e.key === "Enter" && handleUpdate()}
          onChange={(e) => setName(e.target.value)}
          className="rounded w-full focus:outline-none"
        />
      ) : (
        <div
          className="flex-grow hover:cursor-text"
          onClick={() => setEditId(item?._id)}
        >
          {item?.name}
        </div>
      )}
      {editId === item?._id ? (
        <div className="flex gap-4">
          <button onClick={handleUpdate}>
            {loadUpdateId === item?._id ? (
              <PiSpinner className="animate-spin" />
            ) : (
              <FaCheck className="text-blue-600" />
            )}
          </button>
          <button onClick={handleCancelEdit}>
            <FaXmark className="text-red-600" />
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button onClick={handleSetEdit}>
            <FaPenToSquare className="text-green-600" />
          </button>
          <button onClick={() => setModalDelId(item?._id)}>
            {loadDelId === item?._id ? (
              <PiSpinner className="animate-spin" />
            ) : (
              <FaTrashCan className="text-red-600" />
            )}
          </button>
          <AdmCategoryModalDel
            item={item}
            modalId={modalDelId}
            onClose={() => setModalDelId(null)}
          />
        </div>
      )}
    </div>
  );
}
AdmCategoryItems.propTypes;
