/** Пропсы, которые принимает компонент Input */
import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  className?: string;
  /** адрес иконки, если есть*/
  img?: string;
  /** кнопка с действием, если есть*/
  button?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  img,
  button,
  ...props
}) => {
  return (
    <div className={classNames([styles.searchbar])}>
      {img && <img src={img} alt={"иконка"} className={`${styles.searchbar_img}`} />}
      <input
        type="text"
        className={classNames(
          [styles.input_custom],
          { [styles.input_disabled]: props.disabled },
          [styles.searchbar_input],
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)} // onChange = handleChange
        {...props}
      />
      {button && (
        <div className={classNames([styles.searchbar_btn_wrapper])}>{button}</div>
      )}
    </div>
  );
};

export default Input;
