import React, {useEffect, useState} from "react";
import classNames from "classnames";
import "./Filter.scss"
import filter_icon from "../../../static/filter.svg"

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
    onChange: ([{key, value}]: Option[]) => void;
    /** Заблокирован ли дропдаун */
    disabled?: boolean;
    /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
    pluralizeOptions: (value: Option[]) => string;
}


const Filter: React.FC<MultiDropdownProps> = ({options, value,onChange,
                                                                disabled,pluralizeOptions}) => {

    const [showOptions, setShowOptions] = useState(false);

    React.useEffect(() => {
        if (disabled) setShowOptions(false);
    }, [disabled]);

    function toggleDropdown(): void {
        if (!disabled){
            setShowOptions(!showOptions)
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

    function changeValueArray(option: Option): void {   //возвращаем изменившийся список наверх, не меняя его самого
        let newValue: Option[] = [];

        console.log('сейчас выбраны категории', value)
        if (value.some((element: Option) => element.key === option.key)) {
            //отфильтровать из value элемент option и положить в newValue
            newValue = value.filter((element: Option) =>  element.key !== option.key
            );
            console.log('такое уже есть, убираем')
        } else {
            //newValue.concat(value, [option]);
            newValue = [...value, option];
            console.log('такого ещё не было, добавляем')
        }
        onChange(newValue);
    }


    return(
        <div className={'filter'}>
            <button disabled={disabled}
                    onClick={toggleDropdown}
                    className={classNames('filter-header')}
            >
                <img src={filter_icon} alt={"Y"}></img>
                Filter
            </button>
            <div className={'filter-options'}>
            { showOptions &&
                options.map((option) => (
                    <button key = {option.key}
                         className={classNames("filter-element",
                             {'filter-element__selected': isSelected(option)})}
                         onClick={() => {changeValueArray(option)}}
                    >
                        {option.value}
                    </button>
                ))
            }
            </div>
        </div>
    )
};

Filter.defaultProps = {
    disabled: false
}


export default Filter;