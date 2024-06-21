import { Badge } from "../../../components/Components";

export default function ProductTable({ item, i }) {
  return (
    <tr className="*:border *:px-1 text-sm">
      <td className="w-10">{i + 1}</td>
      <td className="capitalize">{item?.name}</td>
      <td>Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden sm:table-cell">{item?.desc}</td>
      <td className="hidden sm:table-cell">{item?.user?.username}</td>
      <td className="hidden md:table-cell">{item?.category?.name}</td>
      <td className="hidden lg:table-cell">
        <div className="flex flex-wrap gap-1">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </td>
    </tr>
  );
}
ProductTable.propTypes;
