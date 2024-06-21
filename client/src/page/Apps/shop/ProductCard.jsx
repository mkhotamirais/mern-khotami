import { Badge } from "../../../components/Components";

export default function ProducCard({ item }) {
  return (
    <div className="border rounded-lg shadow-md p-2 flex flex-col justify-between gap-1">
      <div>
        <div className="capitalize font-medium">{item?.name}</div>
        <div className="text-xl font-light">Rp{item?.price?.toLocaleString("id-ID")}</div>
        <div className="italic">{item?.category?.name}</div>
        <div className="flex gap-1 mt-3 flex-wrap">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
ProducCard.propTypes;
