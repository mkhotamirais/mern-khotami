import toast from "react-hot-toast";
import { useCategory } from "../../../../store/category";
import { useState } from "react";
import { PiSpinner } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

export default function AdmCategoryPost() {
  const [name, setName] = useState("");
  const { postCategory, getCategories, loadPost, setEditId } = useCategory();
  const handleSubmit = (e) => {
    e.preventDefault();
    postCategory({ name }).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getCategories();
        setName("");
      } else toast.error(res.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-1">
      <input
        type="text"
        value={name}
        onFocus={() => setEditId(null)}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 w-full focus:outline-cyan-200"
        placeholder="Add category"
      />
      <button
        type="submit"
        className="bg-cyan-500 w-12 flex items-center justify-center rounded-lg text-white"
      >
        {loadPost ? <PiSpinner /> : <FaPlus />}
      </button>
    </form>
  );
}
