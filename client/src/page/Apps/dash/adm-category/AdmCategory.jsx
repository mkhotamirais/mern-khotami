import { useEffect } from "react";
import { useCategory } from "../../../../store/category";
import { Err, Loading, Title } from "../../../../components/Components";
import AdmCategoryPost from "./AdmCategoryPost";
import AdmCategoryItems from "./AdmCategoryItems";

export default function AdmCategory() {
  const { data, loadPage, errPage, getCategories } = useCategory();
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>Error: {errPage}</Err>;
  else {
    if (data?.length > 0) {
      const renderedData = data && data?.map((item) => <AdmCategoryItems key={item._id} item={item} />);
      content = <div className="border rounded-lg p-3">{renderedData}</div>;
    } else content = <Err>no content</Err>;
  }

  return (
    <div>
      <Title>Category</Title>
      <section className="w-full sm:w-2/3 flex flex-col gap-2">
        <AdmCategoryPost />
        {content}
      </section>
    </div>
  );
}
