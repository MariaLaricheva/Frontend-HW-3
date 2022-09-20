import React from 'react'
import styles from './Services.module.scss'
const Services = () => {

  return(
    <div className={styles.services}>
      <h2 className={styles.title}>
        Services
      </h2>
      <p className={styles.info}>
        We ship our products all over the world
      </p>
      <p className={styles.additional}>
        For more info visit <a href="/about" >About</a> page
      </p>
    </div>
  )
}

export default Services