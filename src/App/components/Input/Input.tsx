/** Пропсы, которые принимает компонент Input */
import React, {ChangeEventHandler, useState} from "react";
import classNames from "classnames";
import "./Input.scss";
import Button, {ButtonProps} from "../Button/Button";

export type InputProps =  {
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


export const Input: React.FC<InputProps> = ({value,
                                                onChange,
                                                className, img, button, ...props}) => {


    return(
        <div className={classNames('search-bar')}>
            {img && <img
                src={img}
                alt={"иконка"}
                className={"search-bar-img"}
            />}
            <input type="text" className={classNames('input-custom', { input_disabled: props.disabled }, className)}
               value={value}
               onChange={(e) => onChange(e.target.value)} // onChange = handleChange
               {...props}
            />
            { button && <div className={classNames('search-bar-btn-wrapper')}>
                {button}
            </div>}
        </div>
    )
};

export default Input;