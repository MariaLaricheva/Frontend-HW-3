import React from 'react'
import styles from './Article.module.scss'

const Article = () => {

  return(
    <div className={styles.article}>
      <h2 className={styles.title}>
        Article
      </h2>
        <p className={styles.info}>
          No data here
        </p>
        <p className={styles.info}>
        Please visit <a href="/about"> About </a> page
        </p>
    </div>
  )
}

export default Article