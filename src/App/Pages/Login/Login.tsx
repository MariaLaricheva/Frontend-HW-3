import React, { useCallback, useEffect, useState } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'
import Input from 'components/Input'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.scss'
import { Meta } from 'utils/meta'
import { runInAction } from 'mobx'

const Login = () => {

  const { userStore } = useRootStore();

  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log("login", username)
    console.log("password", password)
  }, [username, password])

  const onLogin = useCallback(async (username: string, password: string) => {
    console.log("clicked")
    console.log("login", username)
    console.log("password", password)
    if (username !== '' && password !== '') {
      console.log("pass and log")
      await userStore.login(username, password).then(() => {
        runInAction(() => {
          if (userStore.meta === Meta.success) {
            console.log("logging in")
            navigate(`/account`, { replace: true })

          }
        })
      })
    }
  }, [])

  const onRegister = useCallback(() => {
    navigate(`/register`, { replace: true })
  }, [])

  return (
    <div className={styles.login}>
      <h1 className={styles.heading}>Login</h1>

        <Button color={ButtonColor.secondary}
                onClick={onRegister}>
          Don't have an account? Register
        </Button>

      <div className={styles.wrapper}>
        <Input
          type="text"
          placeholder="phone / email / username"
          value={username}
          onChange={(e) => setUsername(e)}
        />
        <Input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e)}}
        />

      </div>
      <Button color={ButtonColor.primary}
              onClick={() => onLogin(username,password)}>
          Log in
      </Button>
    </div>
  )
}

export default observer(Login);
