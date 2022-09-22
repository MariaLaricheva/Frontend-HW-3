import React, { useState } from 'react'

import filter_icon from 'static/filter.svg'
import classNames from 'classnames'

import styles from './Filter.module.scss'

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string
  /** Значение варианта, отображается пользователю */
  value: string
}

export type FilterProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[]
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[]
  /** Callback, вызываемый при выборе варианта */
  onChange: ([{ key, value }]: Option[]) => void
  /** Заблокирован ли дропдаун */
  disabled?: boolean
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string
}

const Filter: React.FC<FilterProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  const [showOptions, setShowOptions] = useState(false)

  React.useEffect(() => {
    if (disabled) setShowOptions(false)
  }, [disabled])

  function toggleDropdown(): void {
    if (!disabled) {
      setShowOptions(!showOptions)
    }
  }

  const isSelected = (option: Option) => {
    let result = false
    value.forEach((el: Option) => {
      if (option.key === el.key) {
        result = true
      }
    })
    return result
  }

  function changeValueArray(option: Option): void {
    //возвращаем изменившийся список наверх, не меняя его самого
    let newValue: Option[] = []

    if (value.some((element: Option) => element.key === option.key)) {
      //отфильтровать из value элемент option и положить в newValue
      newValue = value.filter((element: Option) => element.key !== option.key)
    } else {
      //newValue.concat(value, [option]);
      newValue = [...value, option]
    }
    onChange(newValue)
  }

  return (
    <div className={styles.filter}>
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={classNames(styles.filter_header)}
      >
        <img src={filter_icon} alt="filter"></img>
        Filter
      </button>
      <div className={styles.filter_options}>
        {showOptions &&
          options.map((option) => (
            <button
              key={option.key}
              className={classNames(styles.filter_element, {
                [styles.filter_element__selected]: isSelected(option),
              })}
              onClick={() => {
                changeValueArray(option)
              }}
            >
              {option.value}
            </button>
          ))}
      </div>
    </div>
  )
}

Filter.defaultProps = {
  disabled: false,
}

export default React.memo(Filter)
