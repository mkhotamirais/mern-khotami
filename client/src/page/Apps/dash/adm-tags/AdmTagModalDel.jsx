import toast from "react-hot-toast";
import { Modal } from "../../../../components/Components";
import { useTag } from "../../../../store/tag";

export default function AdmTagModalDel({ onClose, item, modalId }) {
  const { deleteTag, getTags, loadDelId } = useTag();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteTag(item?._id).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getTags();
      } else toast.error(res.message);
    });
  };
  //   const handleDelete = () => {
  //     deleteTag(item?._id).then((res) => {
  //       if (res.ok) {
  //         toast.success(res.message);
  //         getTags();
  //       } else toast.error(res.message);
  //     });
  //   };
  return (
    <Modal
      itemId={item?._id}
      modalId={modalId}
      onClose={onClose}
      type="delete"
      onDel={handleDelete}
      loadDel={loadDelId}
    >
      <div>
        Delete <i>{item?.name}</i>, are you sure?
      </div>
    </Modal>
  );
}
AdmTagModalDel.propTypes;
