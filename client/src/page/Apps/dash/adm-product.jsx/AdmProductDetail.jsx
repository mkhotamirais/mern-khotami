import { useParams } from "react-router-dom";
import { Badge, Err, Loading, Title } from "../../../../components/Components";
import moment from "moment";
import { useEffect } from "react";
import { useProduct } from "../../../../store/product";

export default function AdmProductDetail() {
  const { id } = useParams();
  const { singleData: data, getProductById, loadPage, errPage } = useProduct();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id, getProductById]);
  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    content = (
      <div>
        <Title>
          Detail User <i>{data?.name}</i>
        </Title>
        <div className="border rounded-lg p-3 shadow flex flex-col gap-2">
          <div>
            <b>ID</b> : {data?._id}
          </div>
          <div className="capitalize">
            <b>name</b> : {data?.name}
          </div>
          <div>
            <b>price</b> : Rp{data?.price?.toLocaleString("id-ID")}
          </div>
          <div>
            <b>description</b> : {data?.desc}
          </div>
          <div>
            <b>by</b> : {data?.user?.username}
          </div>
          <div className="flex gap-1 items-center flex-wrap">
            <div>
              <b>tags</b> :
            </div>
            {data?.tag?.map((item) => (
              <Badge key={item?._id}>{item?.name}</Badge>
            ))}
          </div>
          <div className="text-sm">
            <div>Created {moment(data?.createdAt).fromNow()}</div>
            <div>Updated {moment(data?.updatedAt).fromNow()}</div>
          </div>
        </div>
      </div>
    );
  }
  return content;
}
