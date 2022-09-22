import React, { useCallback, useEffect, useState } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'
import Input from 'components/Input'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './Account.module.scss'
import User from 'pages/User'

const Account = () => {

  const { userStore } = useRootStore();

  let navigate = useNavigate();

  const onLogin = useCallback(() => {
    navigate(`/login`, { replace: true })
  }, [])

  const onRegister = useCallback(() => {
    navigate(`/register`, { replace: true })
  }, [])

  if (userStore.user === null) {
  return (
    <div className={styles.account}>
      <h1 className={styles.heading}>Account</h1>

      <p className={styles.info}>
        It appears you are not logged in yet
      </p>

      <Button color={ButtonColor.secondary} onClick={onLogin}>
        Log in
      </Button>

      <Button color={ButtonColor.secondary} onClick={onRegister}>
        Don't have an account? Register
      </Button>
    </div>
  )}

  else return (<User/>)
}

export default observer(Account);
