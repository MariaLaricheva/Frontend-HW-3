import React, { useCallback } from 'react'

import styles from 'components/Header/Header.module.scss'
import Bag from 'static/bag.svg'
import Logo from 'static/logo.svg'
import Name from 'static/name.svg'
import User from 'static/user.svg'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { LinkType } from 'models/linkType'
import { ProductTypeModel } from 'store/models'
import { useRootStore } from 'context/StoreContext'


const Header = () => {
  function isSelected(address: string) {
    return window.location.pathname === address
  }

  const { userStore } = useRootStore()

  const Links: LinkType[] = [
    {
      label: 'Products',
      address: '/'
    },
    {
      label: 'Services',
      address: '/services'
    },
    {
      label: 'Article',
      address: '/article'
    },
    {
      label: 'About',
      address: '/about'
    }
  ]

  let navigate = useNavigate()

  const onUserClick = useCallback(() => {
    if (userStore.user) {
      navigate(`/account`, { replace: true })
    }
    else {
      navigate(`/login`, { replace: true })
    }
  }, [])


  const onLogoClick = useCallback(() => {
    navigate(`/`, { replace: true })
  }, [])

  const onBagClick = useCallback(() => {
    navigate(`/cart`, { replace: true })
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header_left} onClick={onLogoClick}>
        <img src={Logo} className={styles.header_img} alt={'logo'} />
        <img src={Name} className={styles.header_img} alt={'name'} />
      </div>
      <div>
        {Links.map((link) =>
          <Link
            to={link.address}
            className={classNames([styles.header_link], {
              [styles.header_link__selected]: isSelected(link.address),
            })}>
            {link.label}
          </Link>
        )}
      </div>

      <div className={`${styles.header_right}`}>
        <img src={Bag} className={classNames([styles.header_img], {
          [styles.header_img_chosen]: isSelected('/cart')
        })} alt={'bag'} onClick={onBagClick}/>
        <img src={User} className={classNames([styles.header_img], {
          [styles.header_img_chosen]: isSelected('/account') || isSelected('/login') || isSelected('/register')
        })} alt={'user'} onClick={onUserClick}/>
      </div>
    </header>
  )
}

export default React.memo(Header)
