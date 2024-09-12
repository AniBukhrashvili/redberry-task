import AppContainer from "../components/AppContainer";
import AppHeader from "../components/AppHeader";

import styles from "./AppLayout.module.scss";

export default function AppLayout({ children }) {
  return (
    <div className={styles.AppLayout}>
      <AppHeader />
      <AppContainer>{children}</AppContainer>
    </div>
  );
}
