import React from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

export type InputProps = {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  // лучше вставить в значение event,
  // а потом из event.target.value будет доставаться значение чекбокса
  className?: string;
  /** адрес иконки, если есть*/
  img?: string;
  /** кнопка с действием, если есть*/
  button?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;
// без Omit onChange имеет смешанный тип, что вызывает конфликты
// поэтому используем Omit, и он уберет из типа React.InputHTMLAttributes элемент onChange


export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  img,
  button,
  ...props
}) => {
  return (
    <div className={styles.searchbar}>
      {img && <img src={img} alt={"иконка"} className={styles.searchbar_img} />}
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
        <div className={styles.searchbar_btn_wrapper}>{button}</div>
      )}
    </div>
  );
};

export default Input;
