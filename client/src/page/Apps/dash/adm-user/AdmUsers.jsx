import { useEffect } from "react";
import { useUser } from "../../../../store/user";
import { Err, ItemsCard, Loading, Title, ViewOption } from "../../../../components/Components";
import AdmUsersCard from "./AdmUsersCard";
import AdmUsersTable from "./AdmUsersTable";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdmUsers() {
  const { view, setView, data, getUsers, loadPage, errPage } = useUser();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  let content;
  if (loadPage) content = <Loading />;
  else if (errPage) content = <Err>{errPage}</Err>;
  else {
    const cardUsers = data && data?.map((item) => <AdmUsersCard key={item?._id} item={item} />);
    const tableUsers = data && data?.map((item, i) => <AdmUsersTable key={item?._id} item={item} i={i} />);

    if (view === "card") {
      content = <ItemsCard>{cardUsers}</ItemsCard>;
    } else if (view === "table") {
      content = (
        <table className="w-full border-separate">
          <thead>
            <tr className="*:border *:rounded *:text-left *:px-2">
              <th>no</th>
              <th>username</th>
              <th>role</th>
              <th className="hidden sm:table-cell">email</th>
              <th className="hidden md:table-cell">created</th>
              <th className="hidden lg:table-cell">updated</th>
              <th className="flex justify-center">Action</th>
            </tr>
          </thead>
          <tbody>{tableUsers}</tbody>
        </table>
      );
    }
  }
  return (
    <div>
      <div className="flex gap-5 items-center">
        <Title>Users</Title>
        <ViewOption view={view} setView={setView} />
        <Link to="post" className="text-xl text-cyan-500 hover:opacity-70">
          <FaCirclePlus />
        </Link>
      </div>

      {content}
    </div>
  );
}

// import { useGetUsersQuery } from "../../../app/api/userApiSlice";
// import { Err, ItemsCard, Loading, Prev, Title, ViewOption } from "../../../components/Components";
// import AdmUsersCard from "./AdmUsersCard";
// import { Link } from "react-router-dom";
// import { FaCirclePlus } from "react-icons/fa6";
// import { useSelector } from "react-redux";
// import AdmUsersTable from "./AdmUsersTable";
// import { setAdmUserView } from "../../../app/features/basicSlice";

// const AdmUsers = () => {
//   const { data, isLoading, isError, isSuccess, error } = useGetUsersQuery();
//   const { admUserView } = useSelector((state) => state.basic);

//   let content;
//   if (isLoading) content = <Loading />;
//   else if (isError) content = <Err>{error}</Err>;
//   else if (isSuccess) {
//     if (data?.length > 0) {
//       const renderedCard = data && data.map((item) => <AdmUsersCard key={item?._id} item={item} />);
//       const renderedTable = data && data.map((item, i) => <AdmUsersTable key={item?._id} item={item} i={i} />);
//       if (admUserView === "card") {
//         content = <ItemsCard>{renderedCard}</ItemsCard>;
//       } else if (admUserView === "table") {
//         content = (
//           <table className="w-full border-separate">
//             <thead>
//               <tr className="*:border *:rounded *:text-left *:px-2">
//                 <th>no</th>
//                 <th>username</th>
//                 <th>role</th>
//                 <th className="hidden sm:table-cell">email</th>
//                 <th className="hidden md:table-cell">created</th>
//                 <th className="hidden lg:table-cell">updated</th>
//                 <th className="flex justify-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>{renderedTable}</tbody>
//           </table>
//         );
//       }
//     } else content = <Err>no content</Err>;
//   }

//   return (
//     <div>
//       <Title>
//         <Prev />
//         Admin Users
//         <Link to="post" className="text-xl text-cyan-500 hover:opacity-70">
//           <FaCirclePlus />
//         </Link>
//         <ViewOption view={admUserView} setView={setAdmUserView} />
//       </Title>
//       {content}
//     </div>
//   );
// };

// export default AdmUsers;
