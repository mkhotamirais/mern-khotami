import { useParams } from "react-router-dom";
import { Err, Loading, Title } from "../../../../components/Components";
import moment from "moment";
import { useEffect } from "react";
import { useUser } from "../../../../store/user";

export default function AdmUserDetail() {
  const { id } = useParams();
  const { singleData: data, getUserById, loadPage, errPage } = useUser();
  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [getUserById, id]);

  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    content = (
      <div>
        <Title>
          Detail User <i>{data?.username}</i>
        </Title>
        <div className="border rounded-lg p-3 shadow flex flex-col gap-2">
          <div>
            <b>Username</b> : {data?.username}
          </div>
          <div>
            <b>Email</b> : {data?.email}
          </div>
          <div>
            <b>Role</b> : {data?.role}
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
