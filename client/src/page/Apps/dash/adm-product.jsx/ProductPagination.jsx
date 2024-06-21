import { useEffect } from "react";
import { useProduct } from "../../../../store/product";
import { useQuery } from "../../../../store/query";

const ProductPagination = ({ countData }) => {
  const { currentPage, setCurrentPage } = useProduct();

  const { setQuery } = useQuery();
  let limit = 2;
  let skip = currentPage * limit - limit;
  const totalPage = Math.ceil(countData / limit);
  const pageNumbers = Array.from({ length: totalPage }, (v, i) => i + 1);

  const handleCurrentPage = (num) => setCurrentPage(num);
  const nextPage = () => (currentPage !== totalPage ? setCurrentPage(currentPage + 1) : null);
  const prevPage = () => (currentPage !== 1 ? setCurrentPage(currentPage - 1) : null);

  useEffect(() => {
    setQuery({ skip, limit });
  }, [setQuery, skip, limit]);

  return (
    <div>
      <button disabled={currentPage === 1 && true} onClick={prevPage} className="border px-2 disabled:opacity-50">
        Prev
      </button>
      {pageNumbers.map((num, i) => (
        <button
          onClick={() => handleCurrentPage(num)}
          key={i}
          className={`border px-2 hover:bg-blue-500 hover:text-white  ${
            currentPage === num ? "bg-blue-500 text-white" : ""
          }`}
        >
          {num}
        </button>
      ))}
      <button
        disabled={currentPage === totalPage && true}
        onClick={nextPage}
        className="border px-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
ProductPagination.propTypes;
export default ProductPagination;
