/** Пропсы, которые принимает компонент Card */
import "./Card.scss"
import React from "react";

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

const Card: React.FC<CardProps> =  ({image, title,
                                               subtitle,
                                               content,
                                               onClick}) => {
    return(
        <div onClick={onClick} className={'card'}>
            <img src={image} alt={"фото товара"} className={'card-image'}/>
            <h1 className={'card-title'}>{title}</h1>
            <h2 className={'card-subtitle'}>{subtitle}</h2>
            {content}
        </div>
    )
};


Card.defaultProps = {
    /** Содержимое карточки (футер/боковая часть), может быть пустым
    content: ;

     Клик на карточку
     onClick: ;
     */
}

export default Card;