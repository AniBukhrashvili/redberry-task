import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppModal from "../AppModal";
import AppModalActions from "../AppModal/AppModalActions";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalHeader from "../AppModal/AppModalHeader";

import styles from "./AddAgentModal.module.scss";

export default function AddAgentModal({ showAgentModal, setShowAgentModal }) {
  return (
    <AppModal isVisible={showAgentModal} className={styles.AddAgentModal}>
      <AppModalHeader>აგენტის დამატება</AppModalHeader>
      <AppModalContent>
        <form>
          <div className={styles.AddAgentModal__Row}>
            <AppInput
              label={"სახელი"}
              required
              helperText={"მინიმუმ ორი სიმბოლო"}
            />
            <AppInput label={"გვარი"} helperText={"მინიმუმ ორი სიმბოლო"} />
          </div>
          <div className={styles.AddAgentModal__Row}>
            <AppInput
              label={"ელ-ფოსტა"}
              required
              helperText={"გამოიყენეთ @redberry.ge ფოსტა"}
            />
            <AppInput
              label={"ტელეფონის ნომერი"}
              helperText={"მხოლოდ რიცხვები"}
            />
          </div>
          <div className={styles.AddAgentModal__FileRow}>
            <AppInput
              type="file"
              label={"ატვირთეთ ფოტო"}
              required
              variant="dashed"
            />
          </div>
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton variant="secondary" onClick={() => setShowAgentModal(false)}>
          გაუქმება
        </AppButton>
        <AppButton variant="primary">დაამატე აგენტი</AppButton>
      </AppModalActions>
    </AppModal>
  );
}
