import React from "react";
import classNames from "classnames";
import "./Button.scss"
import Loader from "../Loader/Loader";
import {LoaderSize} from "../Loader/Loader";

/** Возможные раскраски кнопки */
export enum ButtonColor {
    /** Основная, акцентная кнопка */
    primary = 'primary',
    /** Второстепенная кнопка */
    secondary = 'secondary'
}

/** Пропсы, который принимает компонент Button */
export type ButtonProps = React.PropsWithChildren<{
    /**
     * Если true, то внутри кнопки вместе с children отображается компонент Loader_old
     * Также кнопка должна переходить в состояние disabled
     * По умолчанию - false
     */
    loading?: boolean;
    /** Цвет кнопки, по умолчанию -  ButtonColor.primary*/
    color?: ButtonColor;
    className?: string
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({loading = false, color,
                                                  children,className, ...props}) => {
    return(
        <button
                disabled={loading}
                className={classNames('button-custom',
                    { 'button_disabled': props.disabled || loading },
                    { 'button_color-primary': (color == ButtonColor.primary) },
                    { 'button_color-secondary': (color == ButtonColor.secondary) },
                    className)}

                {...props}>
            {loading && <Loader loading={loading} size={LoaderSize.s} /> }
            {children}
        </button>
    )
};

Button.defaultProps = {
    loading: false,
    color: ButtonColor.primary
}

export default Button;
