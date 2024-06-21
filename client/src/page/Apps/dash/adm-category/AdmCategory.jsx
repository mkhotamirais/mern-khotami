import { useEffect } from "react";
import { useCategory } from "../../../../store/category";
import { Title } from "../../../../components/Components";
import AdmCategoryPost from "./AdmCategoryPost";
import AdmCategoryItems from "./AdmCategoryItems";

export default function AdmCategory() {
  const { data: categories, loadGet, error, getCategories } = useCategory();
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  let content;
  if (loadGet) content = <p>Loading...</p>;
  if (error) content = <p>Error: {error}</p>;
  else {
    const renderedData = categories?.map((item) => (
      <AdmCategoryItems key={item._id} item={item} />
    ));
    content = (
      <div className="border rounded-lg bg-white p-3">{renderedData}</div>
    );
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
