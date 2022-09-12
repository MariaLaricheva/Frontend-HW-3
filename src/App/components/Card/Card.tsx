/** Пропсы, которые принимает компонент Card */
import React from "react";

import styles from "./Card.module.scss";

type CardProps = {
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Подзаголовок карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  content?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <img src={image} alt={"фото товара"} className={styles.card__img} />
      <h1 className={styles.card__title}>{title}</h1>
      <h2 className={styles.card__subtitle}>{subtitle}</h2>
      {content}
    </div>
  );
};

export default React.memo(Card);
