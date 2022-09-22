/** Пропсы, которые принимает компонент Card */
import React from 'react'

import styles from './Rating.module.scss'
import star from 'static/star.png'
import classNames from 'classnames'

type CardProps = {
  /** по пятибалльной шкале */
  rating:  number
}

const Rating: React.FC<CardProps> = ({
  rating,
}) => {

  let width: number = (rating * 50 ) + (Math.trunc(rating) * 5);

  return (
    <div className={styles.combinator}>
    <div className={styles.rating}>
      <img src={star} alt="рейтинг" className={styles.rating_star_none} />
      <img src={star} alt="рейтинг" className={styles.rating_star_none} />
      <img src={star} alt="рейтинг" className={styles.rating_star_none} />
      <img src={star} alt="рейтинг" className={styles.rating_star_none} />
      <img src={star} alt="рейтинг" className={styles.rating_star_none} />
    </div>

      <div style={{width: width}} className={classNames([styles.rating], [styles.rating_cutter])} >
        <img src={star} alt="рейтинг" className={styles.rating_star} />
        <img src={star} alt="рейтинг" className={styles.rating_star} />
        <img src={star} alt="рейтинг" className={styles.rating_star} />
        <img src={star} alt="рейтинг" className={styles.rating_star} />
        <img src={star} alt="рейтинг" className={styles.rating_star} />
      </div>

    </div>
  )
}

export default React.memo(Rating)
