import { Err, ItemsCard, Loading, Title, ViewOption } from "../../../components/Components";
import { useEffect } from "react";
import { useQuery } from "../../../store/query";
import ProducCard from "./ProductCard";
import ProductTable from "./ProductTable";
import { QueryCategory, QuerySearch, QuerySort, QueryTag, ResetQuery } from "../dash/adm-product/ProductQuery";
import ProductPagination from "../dash/adm-product/ProductPagination";
import { useProduct } from "../../../store/product";

export default function Product() {
  const { view, setView, getProducts, data, loadPage, errPage, countData } = useProduct();
  const { query, queryStr, tagIds, tagIdsStr, setTagIdsStr, setQueryStr } = useQuery();

  useEffect(() => {
    setQueryStr(query);
    setTagIdsStr(tagIds);
  }, [setQueryStr, query, tagIds, setTagIdsStr]);

  // useEffect(() => {
  //   console.log(tagIds);
  //   console.log(tagIdsStr);
  // }, [tagIds, tagIdsStr]);

  useEffect(() => {
    getProducts(queryStr + tagIdsStr);
  }, [getProducts, queryStr, tagIdsStr]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    if (data?.length > 0) {
      const renderedCard = data?.map((item) => <ProducCard key={item?._id} item={item} />);
      const renderedTable = data?.map((item, i) => <ProductTable key={item?._id} item={item} i={i} />);
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
      </div>
      <div className="flex justify-between gap-2">
        <QuerySearch />
        <ResetQuery />
      </div>
      <div className="flex gap-1 items-center my-1">
        <QueryCategory />
        <QuerySort />
      </div>
      <QueryTag />
      <ProductPagination data={data} countData={countData} />
      {content}
    </div>
  );
}
