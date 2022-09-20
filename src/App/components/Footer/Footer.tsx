import React from 'react'

import styles from './Footer.module.scss'
import Logo from 'static/ktsLogo_recolored.png'


const Footer = () => {

  return (
    <div className={styles.footer}>
        <img src={Logo} className={styles.footer_img} alt={'logo'} />
    </div>
  )
}

export default React.memo(Footer)
