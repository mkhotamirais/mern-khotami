import { Err, Loading, Title } from "../../../components/Components";
import { useEffect } from "react";
import { useKamus } from "../../../store/kamus";
import KamusItems from "./KamusItems";
import { KamusQuerySearch, KamusQuerySort } from "../dash/adm-kamus/KamusQuery";

const AdmKamus = () => {
  const { data, getKamuss, loadPage, errPage, query, queryStr, setQueryStr } = useKamus();

  useEffect(() => {
    setQueryStr(query);
  }, [setQueryStr, query]);

  useEffect(() => {
    getKamuss(queryStr);
  }, [getKamuss, queryStr]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    if (data?.length > 0) {
      const renderedData = data && data.map((item) => <KamusItems key={item?._id} item={item} />);
      content = (
        <div>
          <div className="flex flex-col gap-1 my-2">{renderedData}</div>
        </div>
      );
    } else content = <div className="text-center mt-3 italic">no content</div>;
  }

  return (
    <div>
      <div className="flex gap-5 items-center">
        <Title>Kamus</Title>
      </div>

      <div className="flex gap-3 my-2">
        <KamusQuerySearch />
        <KamusQuerySort />
      </div>
      {content}
    </div>
  );
};

export default AdmKamus;
