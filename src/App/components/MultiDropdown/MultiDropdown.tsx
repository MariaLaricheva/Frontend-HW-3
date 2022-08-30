import React, { useState } from "react";

import classNames from "classnames";

import styles from "./MultiDropdown.module.scss";

/** Вариант для выбора в фильтре */
export type optionType = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: optionType[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: optionType[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (options: optionType[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: optionType[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  React.useEffect(() => {
    if (disabled) setShowOptions(false);
  }, [disabled]);

  function toggleDropdown(): void {
    if (!disabled) {
      setShowOptions(!showOptions);
    }
  }

  const isSelected = (option: optionType) => {
    let result = false;
    value.forEach((el: optionType) => {
      if (option.key === el.key) {
        result = true;
      }
    });
    return result;
  };

  function changeValueArray(option: optionType): void {
    //возвращаем изменившийся список наверх, не меняя его самого
    let newValue: optionType[] = [];

    if (value.some((element: optionType) => element.key === option.key)) {
      //отфильтровать из value элемент option и положить в newValue
      newValue = value.filter((element: optionType) => element.key !== option.key);
    } else {
      //newValue.concat(value, [option]);
      newValue = [...value, option];
    }
    onChange(newValue);
  }

  return (
    <>
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={styles.multidropdown__header}
      >
        {pluralizeOptions(value)}
      </button>

      {showOptions &&
        options.map((option) => (
          <button
            key={option.key}
            style={{ width: "400px" }}
            className={classNames([styles.multidropdown__element], {
              [styles.multidropdown__element_selected]: isSelected(option),
            })}
            onClick={() => {
              changeValueArray(option);
            }}
          >
            {option.value}
          </button>
        ))}
    </>
  );
};

MultiDropdown.defaultProps = {
  disabled: false,
};

export default MultiDropdown;
