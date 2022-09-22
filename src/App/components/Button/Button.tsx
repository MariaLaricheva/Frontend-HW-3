import React from 'react'

import Loader from 'components/Loader/Loader'
import { LoaderSize } from 'components/Loader/Loader'
import classNames from 'classnames'

import styles from './Button.module.scss'

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean
  color?: ButtonColor
  className?: string
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  loading,
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
  )
}

Button.defaultProps = {
  loading: false,
  color: ButtonColor.primary,
}

export default React.memo(Button)
