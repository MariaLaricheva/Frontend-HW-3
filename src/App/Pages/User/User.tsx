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
    <div>
      <h1 className={styles.product__heading}>Account</h1>

      <div className={styles.registration__input}>
        <Input
          type="text"
          placeholder="username"
          value={''}
          onChange={(e) => setUsername(e)}
        />
        <Input
          type="text"
          placeholder="email address"
          value={''}
          onChange={(e) => {setEmail(e)}}
        />
        <Input
          type="text"
          placeholder="phone number"
          value={''}
          onChange={(e) => {setPhone(e)}}
        />
        <Input
          type="text"
          placeholder="password"
          value={''}
          onChange={(e) => {setPassword(e)}}
        />
      </div>
      <Button color={ButtonColor.primary} onClick={onLogout}>
        Log out
      </Button>
    </div>
  )
}

export default observer(User);
