export default function KamusItems({ item }) {
  return (
    <div className="border rounded p-1 text-sm">
      <div>
        <span className="font-medium capitalize">{item?.name}</span> : {item?.meaning}
      </div>
      <div className="text-xs">
        Links:{" "}
        {item?.reference?.length > 0 ? (
          item?.reference?.map((itm, i) => (
            <div key={itm?._id} className="inline">
              <a href={itm?.refLink} className="text-cyan-500 hover:underline">
                {itm?.refName}
              </a>
              {i < item?.reference?.length - 1 ? " - " : null}
            </div>
          ))
        ) : (
          <span>-</span>
        )}
      </div>
    </div>
  );
}
KamusItems.propTypes;
