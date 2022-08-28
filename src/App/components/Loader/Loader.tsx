import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

/** Возможные значения размера лоадера */
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
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
  //   'loader_size-${size}' не работает потому что нужны были ` вместо '
  if (loading) {
    return (
      <div
        className={classNames(className, [styles.loader], [styles.loader_size+{size}])}
      ></div>
    );
  } else {
    return <></>;
  }
};

Loader.defaultProps = {
  loading: true,
  size: LoaderSize.m,
};

export default Loader;
