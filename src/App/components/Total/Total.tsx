import React, { useEffect, useState } from "react";

import axios from "axios";

import styles from "./Total.module.scss";

type TotalProps = {
  /** фильтр */
  filter: string[];
};

const Total: React.FC<TotalProps> = ({ filter }) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(0);

    if (filter.length !== 0) {
      filter.map((category: string) => {
        fetch("https://fakestoreapi.com/products/category/" + category);
      });
    } else {
      fetch("https://fakestoreapi.com/products");
    }
  }, [filter]);

  const fetch = async (address: string) => {
    const result = await axios({
      method: "get",
      url: address,
    });

    setTotal(result.data.length);
  };

  return (
    <div className={`${styles.total_wrapper}`}>
      <h2 className={`${styles.total_heading}`}>Total product</h2>
      <div className={`${styles.total_value}`}>{total}</div>
    </div>
  );
};

export default Total;
