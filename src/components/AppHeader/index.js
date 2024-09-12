import RedberryLogo from "../../assets/images/redberry-logo.png";
import AppContainer from "../AppContainer";

import styles from "./AppHeader.module.scss";

export default function AppHeader() {
  return (
    <div className={styles.AppHeader}>
      <AppContainer>
        <a href="/" className={styles.AppHeader__Logo}>
          <img src={RedberryLogo} alt="Redberry Logo" />
        </a>
      </AppContainer>
    </div>
  );
}
