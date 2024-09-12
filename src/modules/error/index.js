import { useNavigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import AppButton from "../../components/AppButton";

import styles from "./Error.module.scss";

export default function Error({ title, text, status }) {
  const router = useNavigate();

  const navigateToHomePage = () => {
    router("/");
  };

  return (
    <AppLayout>
      <div className={styles.Error}>
        <div className={styles.Error__Status}>{status}</div>
        <div className={styles.Error__Title}>{title}</div>
        <div className={styles.Error__Text}>{text}</div>
        <div className={styles.Error__Action}>
          <AppButton variant="primary" onClick={navigateToHomePage}>
            მთავარი გვერდი
          </AppButton>
        </div>
      </div>
    </AppLayout>
  );
}
