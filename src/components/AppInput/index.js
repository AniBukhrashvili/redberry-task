import { useState } from "react";
import classnames from "classnames";

import styles from "./AppInput.module.scss";

export default function AppInput({
  type = "text",
  name,
  variant,
  label,
  value,
  onChange,
  placeholder,
  required,
  helperText,
}) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.AppInput}>
      <label className={styles.AppInput__Label}>
        {label}
        {required && "*"}
      </label>
      <div
        className={classnames(styles.AppInput__Wrapper, {
          [styles["AppInput__Wrapper--Dashed"]]: variant === "dashed",
        })}
      >
        {type === "file" && <div className={styles.AppInput__Icon}></div>}
        <input
          className={styles.AppInput__Input}
          type={type}
          name={name}
          value={value}
          onChange={type === "file" ? handleFileChange : onChange}
          placeholder={placeholder}
          required={required}
          aria-label={name}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className={styles.AppInput__Preview}
          />
        )}
      </div>
      {helperText && (
        <span className={styles.AppInput__HelperText}>
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
                stroke="#021526"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </p>
          {helperText}
        </span>
      )}
    </div>
  );
}
