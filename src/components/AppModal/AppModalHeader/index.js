import CloseSvg from "../../../assets/images/close.svg";

import styles from "./AppModalHeader.module.scss";

export default function AppModalHeader({ children, onClose }) {
  return (
    <div className={styles.AppModalHeader}>
      <div className={styles.AppModalHeader__Title}>{children}</div>
      {onClose && (
        <button
          aria-label="close"
          className={styles.AppModalHeader__Close}
          onClick={onClose}
        >
          <CloseSvg />
        </button>
      )}
    </div>
  );
}
