import React, { useEffect } from 'react'

import styles from 'components/Header/Header.module.scss'
import Bag from 'static/bag.svg'
import Logo from 'static/logo.svg'
import Name from 'static/name.svg'
import User from 'static/user.svg'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Header = () => {
  function isSelected(address: string) {
    return window.location.pathname === address
  }

  //множество Link, которые довольно однообразны,
  // можно бы было записать их всех в массив,
  // а потом сделать .map по ним, вставляя что куда надо

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <img src={Logo} className={styles.header_img} alt={'logo'} />
        <img src={Name} className={styles.header_img} alt={'name'} />
      </div>
      <div>
        <Link
          to="/"
          className={classNames([styles.header_link], {
            [styles.header_link__selected]: isSelected('/'),
          })}
        >
          Products
        </Link>
        <Link
          to="/services"
          className={classNames([styles.header_link], {
            [styles.header_link__selected]: isSelected('/services'),
          })}
        >
          Services
        </Link>
        <Link
          to="/article"
          className={classNames([styles.header_link], {
            [styles.header_link__selected]: isSelected('/article'),
          })}
        >
          Article
        </Link>
        <Link
          to="/about"
          className={classNames([styles.header_link], {
            [styles.header_link__selected]: isSelected('/about'),
          })}
        >
          About Us
        </Link>
      </div>
      <div className={`${styles.header_right}`}>
        <img src={Bag} className={styles.header_img} alt={'bag'} />
        <img src={User} className={styles.header_img} alt={'user'} />
      </div>
    </header>
  )
}

export default React.memo(Header)
