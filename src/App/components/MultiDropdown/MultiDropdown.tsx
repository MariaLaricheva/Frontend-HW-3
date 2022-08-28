import React, { useState } from "react";

import classNames from "classnames";
import "./MultiDropdown.scss";

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: ([{ key, value }]: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
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

  const isSelected = (option: Option) => {
    let result = false;
    value.forEach((el: Option) => {
      if (option.key === el.key) {
        result = true;
      }
    });
    return result;
  };

  function changeValueArray(option: Option): void {
    //возвращаем изменившийся список наверх, не меняя его самого
    let newValue: Option[] = [];

    if (value.some((element: Option) => element.key === option.key)) {
      //отфильтровать из value элемент option и положить в newValue
      newValue = value.filter((element: Option) => element.key !== option.key);
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
        className={classNames("multidropdown__header")}
      >
        {pluralizeOptions(value)}
      </button>

      {showOptions &&
        options.map((option) => (
          <button
            key={option.key}
            style={{ width: "400px" }}
            className={classNames("multidropdown__element", {
              multidropdown__element_selected: isSelected(option),
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
