import React, { useCallback, useEffect, useState } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'
import Input from 'components/Input'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.scss'

const Cart = () => {

  const { cartStore } = useRootStore();

  let navigate = useNavigate();

  const onLogin = useCallback(() => {
    navigate(`/login`, { replace: true })
  }, [])

  const onRegister = useCallback(() => {
    navigate(`/register`, { replace: true })
  }, [])

  return (
    <div>
      <h1 className={styles.registration__heading}>Account</h1>

      <p className={styles.registration__input}>
        It appears you are not logged in yet
      </p>

      <Button color={ButtonColor.secondary} onClick={onLogin}>
        Log in
      </Button>

      <Button color={ButtonColor.secondary} onClick={onRegister}>
        Don't have an account? Register
      </Button>
    </div>
  )
}

export default observer(Cart);
