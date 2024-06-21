import toast from "react-hot-toast";
import { Modal } from "../../../../components/Components";
import { useUser } from "../../../../store/user";

export function AdmUserModalDel({ onClose, item, modalId }) {
  const { deleteUser, getUsers, loadDel } = useUser();
  const onDel = (e) => {
    e.preventDefault();
    deleteUser(item?._id).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getUsers();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Modal itemId={item?._id} modalId={modalId} onClose={onClose} type="delete" onDel={onDel} loadDel={loadDel}>
      <div>
        Delete <i>{item?.username}</i>, are you sure?
      </div>
    </Modal>
  );
}
AdmUserModalDel.propTypes;
