import classnames from "classnames";
import AppPortal from "../AppPortal";

import styles from "./AppModal.module.scss";

export default function AppModal({ isVisible, children, className }) {
  if (!isVisible) return null;

  return (
    <AppPortal>
      <div className={classnames(styles.AppModal, className)}>
        <div className={styles.AppModal__Container}>{children}</div>
      </div>
    </AppPortal>
  );
}
