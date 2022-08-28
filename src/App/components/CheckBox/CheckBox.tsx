/** Пропсы, которые принимает компонент CheckBox */
import React, { useState } from "react";

import classNames from "classnames";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const [checked, setChecked] = useState(false);

  function toggleCheck(): void {
    if (!props.disabled) {
      setChecked(!checked);
    }
    onChange(checked);
  }

  return (
    <input
      type="checkbox"
      className={classNames(
        "checkbox_custom",
        { disabled: props.disabled },
        { checked: checked }
      )}
      onClick={toggleCheck}
      checked={checked}
      {...props}
    ></input>
  );
};

export default CheckBox;
