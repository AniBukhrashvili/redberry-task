import AppPortal from "../AppPortal";

import styles from "./AppModal.module.scss";

export default function AppModal({ isVisible, children }) {
  if (!isVisible) return null;

  return (
    <AppPortal>
      <div className={styles.AppModal}>
        <div className={styles.AppModal__Container}>{children}</div>
      </div>
    </AppPortal>
  );
}
