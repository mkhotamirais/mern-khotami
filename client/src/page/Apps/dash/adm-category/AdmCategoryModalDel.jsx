import toast from "react-hot-toast";
import { Modal } from "../../../../components/Components";
import { useCategory } from "../../../../store/category";

export default function AdmCategoryModalDel({ onClose, item, modalId }) {
  const { deleteCategory, getCategories, loadDelId } = useCategory();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteCategory(item?._id).then((res) => {
      if (res.ok) {
        toast.success(res.message);
        getCategories();
      } else toast.error(res.message);
    });
  };
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
AdmCategoryModalDel.propTypes;
