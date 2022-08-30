import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

type LoaderProps = {
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }) => {

    return (
      <div
        className={classNames(className, styles.loader, styles[`loader_size_${size}`])}
      />
    );
};

Loader.defaultProps = {
  size: LoaderSize.m
};

export default Loader;
