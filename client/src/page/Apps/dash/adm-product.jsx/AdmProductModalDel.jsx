import { Modal } from "../../../../components/Components";
import toast from "react-hot-toast";
import { useProduct } from "../../../../store/product";

export default function AdmProductModalDel({ onClose, item, modalId }) {
  const { deleteProduct, getProducts, loadDel } = useProduct();
  const onDel = (e) => {
    e.preventDefault();
    deleteProduct(item?._id).then((res) => {
      if (res?.ok) {
        toast.success(res?.message);
        getProducts();
      } else toast.error(res?.message);
    });
  };

  return (
    <Modal itemId={item?._id} modalId={modalId} onClose={onClose} type="delete" onDel={onDel} loadDel={loadDel}>
      <div>
        Delete <i>{item?.name}</i>, are you sure?
      </div>
    </Modal>
  );
}
AdmProductModalDel.propTypes;
