import { Modal } from "../../../../components/Components";
import toast from "react-hot-toast";
import { useKamus } from "../../../../store/kamus";

const AdmKamusModalDel = ({ onClose, item, modalId }) => {
  const { deleteKamus, getKamuss, loadDel } = useKamus();
  const onDel = (e) => {
    e.preventDefault();
    deleteKamus(item?._id).then((res) => {
      if (res?.ok) {
        toast.success(res?.message);
        getKamuss();
      } else toast.error(res?.message);
    });
  };
  return (
    <Modal onClose={onClose} itemId={item?._id} modalId={modalId} type="delete" onDel={onDel} loadDel={loadDel}>
      <div className="my-3">Delete {item?.name}, are you sure?</div>
    </Modal>
  );
};
AdmKamusModalDel.propTypes;

export default AdmKamusModalDel;
