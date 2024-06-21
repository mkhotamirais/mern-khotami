// import { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useKamus } from "../../../../store/kamus";

export const KamusQuerySearch = () => {
  const { q, setQ, setQuery } = useKamus();

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery({ q });
    setQ(q);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search here"
        className="w-full border rounded focus:outline-none p-1 bg-inherit"
      />
      <button type="submit" className="w-12 border rounded flex items-center justify-center text-sm hover:opacity-70">
        <FaMagnifyingGlass />
      </button>
    </form>
  );
};

export const KamusQuerySort = () => {
  const { sort, setSort, setQuery } = useKamus();

  const handleChange = (e) => {
    setQuery({ sort: e.target.value });
    setSort(e.target.value);
  };

  return (
    <select
      name="sort"
      id="sort"
      value={sort}
      onChange={handleChange}
      className={`dark:bg-slate-800 self-grow focus:outline-none bg-white border h-full rounded p-[0.3rem]`}
    >
      <option value={""}>sort</option>
      <option value={"name"}>asc name</option>
      <option value={"-name"}>desc name</option>
      <option value={"createdAt"}>asc createdAt</option>
      <option value={"-createdAt"}>desc createdAt</option>
      <option value={"updatedAt"}>asc updatedAt</option>
      <option value={"-updatedAt"}>desc updatedAt</option>
    </select>
  );
};
