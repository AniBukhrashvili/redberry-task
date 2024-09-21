import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../services/outsideClick";

import styles from "./AppSelect.module.scss";

const AppSelectDropDown = ({ options = [], name, onSelect, agentClick }) => {
  const _onClick = (_value) => {
    onSelect(_value);
  };

  return (
    <div className={styles.AppSelectDropdown}>
      {options.length > 0 && (
        <div className={styles.AppSelectDropdown__Content}>
          {name === "agent_id" && (
            <button
              className={styles.AppSelectDropdownOption}
              type="button"
              onClick={agentClick}
            >
              <span className={styles.AppSelectDropdownOption__Icon}>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </span>
              დაამატე აგენტი
            </button>
          )}
          {options.map((option, index) => (
            <button
              key={index}
              className={styles.AppSelectDropdownOption}
              type="button"
              onClick={() => _onClick(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}

      {options.length === 0 && (
        <div className={styles.AppSelectDropdown__Empty}>
          მონაცემები არ არის
        </div>
      )}
    </div>
  );
};

export default function AppSelect({
  value = null,
  options = [],
  name = null,
  label,
  required,
  placeholder = "აირჩიეთ",
  onSelect,
  onClose,
  agentClick,
  helperText,
  error,
}) {
  const appSelectEl = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const _options = options.filter((option) => {
    return option.name;
  });

  const reset = () => {
    setOpened(false);
    onClose && onClose(name);
  };

  const toggleDropdown = () => {
    setOpened(!isOpened);
  };

  const _onSelect = (_value, _name) => {
    const selectedOption = options.find((option) => option.id === _value);

    setActiveOption(selectedOption ? selectedOption.name : placeholder);
    onSelect && onSelect(_value); // Update this line
    reset();
  };

  useOutsideClick(appSelectEl, () => {
    reset();
  });

  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.id === value);
      setActiveOption(selectedOption ? selectedOption.name : placeholder);
    }
  }, [value, options, placeholder]);

  return (
    <div ref={appSelectEl} className={styles.AppSelect}>
      <label className={styles.AppSelect__Label}>
        {label}
        {required && "*"}
      </label>
      <button
        className={styles.AppSelect__Trigger}
        type="button"
        onClick={toggleDropdown}
      >
        <div className={styles.AppSelect__Body}>
          <div className={styles.AppSelect__Placeholder}>
            {activeOption || placeholder}
          </div>
        </div>

        <div
          className={classNames(styles.AppSelect__Icon, {
            [styles["AppSelect__Icon--Active"]]: isOpened,
          })}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.91247 4.83785C3.68466 4.61004 3.31532 4.61004 3.08751 4.83785C2.85971 5.06565 2.85971 5.435 3.08751 5.6628L6.58751 9.1628C6.81532 9.39061 7.18466 9.39061 7.41247 9.1628L10.9125 5.6628C11.1403 5.435 11.1403 5.06565 10.9125 4.83785C10.6847 4.61004 10.3153 4.61004 10.0875 4.83785L6.99999 7.92537L3.91247 4.83785Z"
              fill="#021526"
            />
          </svg>
        </div>
      </button>
      {helperText && (
        <span
          className={classNames(styles.AppSelect__HelperText, {
            [styles["AppSelect__HelperText--Error"]]: error,
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
      {isOpened && (
        <AppSelectDropDown
          name={name}
          options={_options}
          onSelect={_onSelect}
          agentClick={agentClick}
        />
      )}
    </div>
  );
}
