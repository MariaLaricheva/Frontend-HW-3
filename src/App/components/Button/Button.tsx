import React from "react";

import Loader from "@components/Loader/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import classNames from "classnames";

import styles from "./Button.module.scss";

/** Возможные раскраски кнопки */
export enum ButtonColor {
  /** Основная, акцентная кнопка */
  primary = "primary",
  /** Второстепенная кнопка */
  secondary = "secondary",
}

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   * По умолчанию - false
   */
  loading?: boolean;
  /** Цвет кнопки, по умолчанию -  ButtonColor.primary*/
  color?: ButtonColor;
  className?: string;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading ,
  color,
  children,
  className,
  ...props
}) => {
  return (
    <button
      disabled={loading || props.disabled}
      className={classNames(
        styles.button_custom,
        styles[`button_color__${color}`],
        className
      )}
      {...props}
    >
      {loading && <Loader size={LoaderSize.s} />}
      {children}
    </button>
  );
};

Button.defaultProps = {
  loading: false,
  color: ButtonColor.primary,
};

export default React.memo(Button);
