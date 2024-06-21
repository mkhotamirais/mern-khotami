import { useState } from "react";
import { Actions, Badge } from "../../../../components/Components";
import AdmProductModalDel from "./AdmProductModalDel";

export default function AdmProducCard({ item }) {
  const [idModalDel, setIdModalDel] = useState(null);

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
      <Actions
        id={item?._id}
        onDel={() => setIdModalDel(item?._id)}
        className={`gap-3 mt-2 pt-2 border-t justify-around`}
      />
      <AdmProductModalDel item={item} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
    </div>
  );
}
AdmProducCard.propTypes;
