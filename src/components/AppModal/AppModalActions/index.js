import styles from './AppModalActions.module.scss';

export default function AppModalActions({ children }) {
  return <div className={styles.AppModalActions}>{children}</div>;
}
