import { useEffect } from "react";
import { useTag } from "../../../../store/tag";
import { Title } from "../../../../components/Components";
import AdmTagPost from "./AdmTagPost";
import AdmTagItems from "./AdmTagItems";

export default function AdmTag() {
  const { data: tags, loadGet, error, getTags } = useTag();
  useEffect(() => {
    getTags();
  }, [getTags]);

  let content;
  if (loadGet) content = <p>Loading...</p>;
  if (error) content = <p>Error: {error}</p>;
  else {
    const renderedData = tags?.map((item) => (
      <AdmTagItems key={item._id} item={item} />
    ));
    content = (
      <div className="border rounded-lg bg-white p-3">{renderedData}</div>
    );
  }

  return (
    <div>
      <Title>Tag</Title>
      <section className="w-full sm:w-2/3 flex flex-col gap-2">
        <AdmTagPost />
        {content}
      </section>
    </div>
  );
}
