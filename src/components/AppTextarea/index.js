import classnames from "classnames";

import styles from "./AppTextarea.module.scss";

export default function AppTextarea({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  helperText,
  error,
}) {
  return (
    <div className={styles.AppTextarea}>
      <label className={styles.AppTextarea__Label}>
        {label}
        {required && "*"}
      </label>
      <div
        className={classnames(styles.AppTextarea__Wrapper, {
          [styles["AppTextarea__Wrapper--Error"]]: error,
        })}
      >
        <textarea
          className={styles.AppTextarea__Textarea}
          name={name}
          value={value}
          rows={6}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-label={name}
        />
      </div>
      {helperText && (
        <span
          className={classnames(styles.AppTextarea__HelperText, {
            [styles["AppTextarea__HelperText--Error"]]: error,
          })}
        >
          <p>
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1.4082L4.125 9.59002L1 5.87101"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          {helperText}
        </span>
      )}
    </div>
  );
}
