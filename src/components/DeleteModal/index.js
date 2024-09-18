import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppButton from "../AppButton";
import AppModal from "../AppModal";
import AppModalActions from "../AppModal/AppModalActions";
import AppModalContent from "../AppModal/AppModalContent";
import { deleteRealEstateRequest } from "../../api/deleteRealEstate";

import styles from "./DeleteModal.module.scss";

export default function DeleteModal({ showDeleteModal, setShowDeleteModal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteRealEstate = async (estateId) => {
    try {
      await deleteRealEstateRequest(estateId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting real estate:", error);
    }
  };

  return (
    <AppModal isVisible={showDeleteModal} className={styles.DeleteModal}>
      <AppModalContent>
        <div className={styles.DeleteModal__Content}>
          გსურთ წაშალოთ ლისტინგი?
        </div>
      </AppModalContent>
      <AppModalActions center>
        <AppButton
          variant="secondary"
          onClick={() => setShowDeleteModal(false)}
        >
          გაუქმება
        </AppButton>
        <AppButton
          variant="primary"
          type="submit"
          onClick={() => deleteRealEstate(id)}
        >
          დადასტურება
        </AppButton>
      </AppModalActions>
    </AppModal>
  );
}
