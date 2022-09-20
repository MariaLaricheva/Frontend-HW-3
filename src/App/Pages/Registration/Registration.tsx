import React, { useCallback, useEffect, useState } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'
import Input from 'components/Input'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './Registration.module.scss'

const Registration = () => {

  const { userStore } = useRootStore();

  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    console.log(userStore.user)
  }, [password])

  const Register = () => {
    if (username !== '' && email !== '' && phone !== '' && password !== '' && repeatPassword === password) {
      userStore.registrate({
        name: {
          firstName: '',
          lastName: '',
          middleName: '',
        },
        username: username,
        password: password,
        email: email,
        phone: phone,
        id: 100,
        birthday: null,
        country: null,
      })
      navigate(`/account`, { replace: true })
    }
  }

  const onLogin = useCallback(() => {
    navigate(`/login`, { replace: true })
  }, [])

  return (
    <div>
      <h1 className={styles.registration__heading}>Registration</h1>

      <Button color={ButtonColor.secondary} onClick={onLogin}>
        Already have an account? Log in
      </Button>

      <div className={styles.registration__input}>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e)}
        />
        <Input
          type="text"
          placeholder="email address"
          value={email}
          onChange={(e) => {setEmail(e)}}
        />
        <Input
          type="text"
          placeholder="phone number"
          value={phone}
          onChange={(e) => {setPhone(e)}}
        />
        <Input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {setPassword(e)}}
        />
        <Input
          type="text"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={(e) => {setRepeatPassword(e)}}
        />
      </div>
      <Button color={ButtonColor.primary} onClick={Register}>
        Register
      </Button>
    </div>
  )
}

export default observer(Registration);
