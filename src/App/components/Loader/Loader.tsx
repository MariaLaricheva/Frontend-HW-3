import './Loader.scss';
import classNames from "classnames";
import React, {useState} from "react";


/** Возможные значения размера лоадера */
export enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
}

/** Пропсы, которые принимает компонент Loader_old */
type LoaderProps = {
    /**
     * Идет ли загрузка.
     * По умолчанию - true, для удобства использования
     * Если false, то лоадер не должен отображаться
     */
    loading?: boolean;
    /**
     * Размер лоадера. При передаче данного пропса, должен добавляться css-класс loader_size-{size}
     * По умолчанию: размер - LoaderSize.m, css-класс - loader_size-m
     */
    size?: LoaderSize;
    /**
     * Дополнительные CSS-классы.
     */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading, size, className }) => {

    //   'loader_size-${size}' не работает
        if (loading) {
        return(
            <div className={classNames( className, 'loader', 'loader_size-'+(size))} >
            </div>
    ) }
        else {
            return (<></>)
        }
};

Loader.defaultProps = {
    loading: true,
    size: LoaderSize.m
}

export default Loader;