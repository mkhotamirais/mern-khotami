import { useEffect } from "react";
import { useTag } from "../../../../store/tag";
import { Err, Loading, Title } from "../../../../components/Components";
import AdmTagPost from "./AdmTagPost";
import AdmTagItems from "./AdmTagItems";

export default function AdmTag() {
  const { data, loadPage, errPage, getTags } = useTag();
  useEffect(() => {
    getTags();
  }, [getTags]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>Error: {errPage}</Err>;
  else {
    if (data?.length > 0) {
      const renderedData = data && data?.map((item) => <AdmTagItems key={item._id} item={item} />);
      content = <div className="border rounded-lg p-3">{renderedData}</div>;
    } else content = <Err>no content</Err>;
  }

  return (
    <div>
      <Title>Tags</Title>
      <section className="w-full sm:w-2/3 flex flex-col gap-2">
        <AdmTagPost />
        {content}
      </section>
    </div>
  );
}

// if (data?.length > 0) {
//   const renderedCard = data?.map((item) => <AdmProducCard key={item?._id} item={item} />);
//   const renderedTable = data?.map((item, i) => <AdmProductTable key={item?._id} item={item} i={i} />);
//   if (view === "card") content = <ItemsCard>{renderedCard}</ItemsCard>;
//   else if (view === "table") {
//     content = (
//       <table className="w-full border-separate">
//         <thead>
//           <tr className="*:border *:rounded *:text-left *:px-1">
//             <th>no</th>
//             <th>name</th>
//             <th>price</th>
//             <th className="hidden sm:table-cell">description</th>
//             <th className="hidden sm:table-cell">user</th>
//             <th className="hidden md:table-cell">category</th>
//             <th className="hidden lg:table-cell">tag</th>
//             <th className="flex justify-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>{renderedTable}</tbody>
//       </table>
//     );
//   }
// } else content = <Err>no content</Err>;
