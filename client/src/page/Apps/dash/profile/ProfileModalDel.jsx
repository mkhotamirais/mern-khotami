import toast from "react-hot-toast";
import { Modal } from "../../../../components/Components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../store/auth";

export default function ProfileModalDel({ item, modalId, onClose }) {
  const { deleteMe, loadDel: isLoading } = useAuth();
  const navigate = useNavigate();
  const onDel = (e) => {
    e.preventDefault();
    deleteMe().then((res) => {
      if (res.ok) {
        toast.success(res.message);
        navigate("/app/login");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <Modal itemId={item?._id} modalId={modalId} onClose={onClose} type={"delete"} loadDel={isLoading} onDel={onDel}>
      <div className="my-3">Delete your account, are you sure?</div>
    </Modal>
  );
}
ProfileModalDel.propTypes;
