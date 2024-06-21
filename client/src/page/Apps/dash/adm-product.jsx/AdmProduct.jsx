import { Err, ItemsCard, Loading, Title, ViewOption } from "../../../../components/Components";
import AdmProducCard from "./AdmProducCard";
import AdmProductTable from "./AdmProductTable";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
// import {
//   QueryCategory,
//   QuerySearch,
//   QuerySortCategory,
//   QuerySortCreated,
//   QuerySortName,
//   QuerySortPrice,
//   QuerySortUpdated,
//   QueryTag,
//   ResetQuery,
// } from "./ProductQuery";
// import ProductPagination from "./ProductPagination";
import { useProduct } from "../../../../store/product";
import { useEffect } from "react";

export default function AdmProduct() {
  const { view, setView, getProducts, data, loadPage, errPage } = useProduct();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    if (data?.length > 0) {
      const renderedCard = data?.map((item) => <AdmProducCard key={item?._id} item={item} />);
      const renderedTable = data?.map((item, i) => <AdmProductTable key={item?._id} item={item} i={i} />);
      if (view === "card") content = <ItemsCard>{renderedCard}</ItemsCard>;
      else if (view === "table") {
        content = (
          <table className="w-full border-separate">
            <thead>
              <tr className="*:border *:rounded *:text-left *:px-1">
                <th>no</th>
                <th>name</th>
                <th>price</th>
                <th className="hidden sm:table-cell">description</th>
                <th className="hidden sm:table-cell">user</th>
                <th className="hidden md:table-cell">category</th>
                <th className="hidden lg:table-cell">tag</th>
                <th className="flex justify-center">Action</th>
              </tr>
            </thead>
            <tbody>{renderedTable}</tbody>
          </table>
        );
      }
    } else content = <Err>no content</Err>;
  }
  return (
    <div>
      <div className="flex gap-5 items-center">
        <Title>Product</Title>
        <ViewOption view={view} setView={setView} />
        <Link to="post" className="text-xl text-cyan-500 hover:opacity-70">
          <FaCirclePlus />
        </Link>
      </div>
      {/* <div className="flex justify-between gap-2">
        <QuerySearch />
        <ResetQuery />
      </div>
      <div className="flex gap-1 items-center my-1 flex-wrap">
        <div className="min-w-max">Sort:</div>
        <QuerySortName />
        <QuerySortPrice />
        <QuerySortCategory />
        <QuerySortCreated />
        <QuerySortUpdated />
      </div>
      <div className="flex gap-1 items-center my-1">
        <div className="min-wmax">Filter:</div>
        <QueryCategory />
      </div>
      <QueryTag /> */}
      {/* <ProductPagination data={products} /> */}
      {content}
    </div>
  );
}
