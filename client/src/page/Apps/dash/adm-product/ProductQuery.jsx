import { FaMagnifyingGlass } from "react-icons/fa6";
import { Select } from "../../../../components/Tags";
import { useCategory } from "../../../../store/category";
import { useEffect } from "react";
import { useQuery } from "../../../../store/query";
import { Badge } from "../../../../components/Components";
import { useTag } from "../../../../store/tag";
import { useProduct } from "../../../../store/product";

export const ResetQuery = () => {
  const { resetAll } = useQuery();
  return (
    <button onClick={resetAll} className="bg-blue-500 rounded px-2 hover:opacity-70 text-white">
      Reset
    </button>
  );
};

export const QuerySearch = () => {
  const { q, setQ, setQuery } = useQuery();
  const { setCurrentPage } = useProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery({ q });
    setQ(q);
    setCurrentPage(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full sm:w-56 flex">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search here"
          className="w-full border rounded-l p-1 focus:outline-cyan-300 bg-inherit"
        />
        <button
          type="submit"
          className="w-10 rounded-r hover:opacity-70 bg-blue-500 flex items-center justify-center text-white"
        >
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export const QueryCategory = () => {
  const { category, setCategory, setQuery } = useQuery();
  const { data, getCategories } = useCategory();
  const { setCurrentPage } = useProduct();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleChange = (e) => {
    setQuery({ category: e.target.value });
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Select className={"w-max mb-0"} value={category} id="category" onChange={handleChange}>
      <option value="">filter category</option>
      {data?.map((item) => (
        <option key={item?._id} value={item?._id}>
          {item?.name}
        </option>
      ))}
    </Select>
  );
};

export const QuerySort = () => {
  const { sort, setSort, setQuery } = useQuery();
  const handleChange = (e) => {
    console.log(e.target.value);
    setQuery({ sort: e.target.value });
    setSort(e.target.value);
  };

  return (
    <Select className={"w-max mb-0"} value={sort} id="sort" onChange={handleChange}>
      <option value="">sort</option>
      <option value="name">asc name</option>
      <option value="-name">desc name</option>
      <option value="price">asc price</option>
      <option value="-price">desc price</option>
      <option value="category">asc category</option>
      <option value="-category">desc category</option>
      <option value="createdAt">asc createdAt</option>
      <option value="-createdAt">desc createdAt</option>
      <option value="updateAt">asc updateAt</option>
      <option value="-updateAt">desc updateAt</option>
    </Select>
  );
};

export const QueryTag = () => {
  const { tagIds, setTagIds } = useQuery();
  const { data, getTags } = useTag();
  const { setCurrentPage } = useProduct();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleClick = (id) => {
    setTagIds(id);
    setCurrentPage(1);
  };

  return (
    <div className="flex gap-1 items-center flex-wrap mb-2">
      Tag:
      {data?.map((item) => (
        <Badge
          onClick={() => handleClick(item?._id)}
          key={item?._id}
          className={`${
            tagIds.includes(item?._id) ? "bg-blue-500" : "bg-gray-500"
          } text-white cursor-pointer hover:bg-blue-500`}
        >
          {item?.name}
        </Badge>
      ))}
    </div>
  );
};
