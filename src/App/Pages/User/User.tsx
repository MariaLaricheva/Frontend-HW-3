import React, { useCallback, useEffect, useState } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'
import Input from 'components/Input'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './User.module.scss'

const User = () => {

  const { userStore } = useRootStore();

  const [user, setUser] = useState(userStore.user)

  let navigate = useNavigate();

  // @ts-ignore
  const [username, setUsername] = useState(user.username);
  // @ts-ignore
  const [email, setEmail] = useState(user.email);
  // @ts-ignore
  const [phone, setPhone] = useState(user.phone);
  // @ts-ignore
  const [password, setPassword] = useState(user.password);

  const onLogout = useCallback(() => {
    userStore.logout()
    navigate(`/logout`, { replace: true })
  }, [])

  return (
    <div className={styles.user}>
      <h1 className={styles.heading}>Account</h1>

      <div className={styles.wrapper}>
        <p className={styles.info}>Username: {userStore.user?.username}</p>
        <p className={styles.info}>Email: {userStore.user?.email}</p>
        <p className={styles.info}>Phone number: {userStore.user?.phone}</p>
        <Button color={ButtonColor.primary} onClick={onLogout}>
          Log out
        </Button>
      </div>

    </div>
  )
}

export default observer(User);
