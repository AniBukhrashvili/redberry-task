import classnames from "classnames";

import styles from "./AppRadio.module.scss";

export default function AppRadio({
  children,
  name,
  checked,
  onChange,
  value,
  error,
}) {
  return (
    <>
      <label
        className={classnames(styles.AppRadio, {
          [styles["AppRadio--Checked"]]: checked,
        })}
      >
        <input
          name={name}
          checked={checked}
          onChange={onChange}
          type="radio"
          value={value}
          className={styles.AppRadio__Input}
        />
        <span className={styles.AppRadio__Title}>{children}</span>
      </label>
      {error && <span className={styles.AppRadio__Error}>{error}</span>}
    </>
  );
}
