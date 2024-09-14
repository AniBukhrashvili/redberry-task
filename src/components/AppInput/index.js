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
          <div className={styles.AppInput__Preview}>
            <img src={preview} alt="Preview" />
            <p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11.5"
                  fill="white"
                  stroke="#021526"
                />
                <path
                  d="M6.75 8.5H7.91667H17.25"
                  stroke="#021526"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.0834 8.50033V16.667C16.0834 16.9764 15.9605 17.2732 15.7417 17.492C15.5229 17.7107 15.2262 17.8337 14.9167 17.8337H9.08341C8.774 17.8337 8.47725 17.7107 8.25846 17.492C8.03966 17.2732 7.91675 16.9764 7.91675 16.667V8.50033M9.66675 8.50033V7.33366C9.66675 7.02424 9.78966 6.72749 10.0085 6.5087C10.2272 6.28991 10.524 6.16699 10.8334 6.16699H13.1667C13.4762 6.16699 13.7729 6.28991 13.9917 6.5087C14.2105 6.72749 14.3334 7.02424 14.3334 7.33366V8.50033"
                  stroke="#021526"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.8333 11.417V14.917"
                  stroke="#021526"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.1667 11.417V14.917"
                  stroke="#021526"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
          </div>
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
