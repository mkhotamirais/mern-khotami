import toast from "react-hot-toast";
import { useTag } from "../../../../store/tag";
import { useState } from "react";
import { PiSpinner } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

export default function AdmTagPost() {
  const [name, setName] = useState("");
  const { postTag, getTags, loadPost, setEditId } = useTag();
  const handleSubmit = (e) => {
    e.preventDefault();
    postTag({ name }).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getTags();
        setName("");
      } else toast.error(res.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-1">
      <input
        type="text"
        value={name}
        onClick={() => setEditId(null)}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 w-full focus:outline-cyan-200 bg-inherit"
        placeholder="Add tag"
      />
      <button type="submit" className="bg-cyan-500 w-12 flex items-center justify-center rounded-lg text-white">
        {loadPost ? <PiSpinner className="animate-spin" /> : <FaPlus />}
      </button>
    </form>
  );
}
