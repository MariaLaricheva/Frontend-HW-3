import { useEffect, useState } from "react";

import Button from "@components/Button/Button";
import Filter from "@components/Filter";
import Input from "@components/Input";
import { optionType } from "@components/MultiDropdown/MultiDropdown";
import ProductList from "@components/ProductList/ProductList";
import Total from "@components/Total";
import Loupe from "@static/search-normal.svg";
import axios from "axios";

import styles from "./Products.module.scss";

const Products = () => {
  const [categories, setCategories] = useState<optionType[]>([]);
  const [limit, setLimit] = useState(6);
  const [filter, setFilter] = useState<optionType[]>([]);

  useEffect(() => {
    fetch();
    setLimit(6);
  }, [filter]);

  const fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://fakestoreapi.com/products/categories",
    });
    setCategories(
      result.data.map((raw: string, index: number) => ({
        key: index,
        value: raw.toString(),
      }))
    );
  };

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY + 5 >= document.body.offsetHeight) {
      if (limit < 20) {
        setLimit(limit + 3);
      }
    }
  };

  return (
    <div>
      <h1 className={styles.product__heading}>Products</h1>
      <p className={styles.product__paragraph}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>

      <div className={styles.product__search}>
        <Input
          type={"text"}
          value={"Search"}
          onChange={() => {}}
          className={"search-bar-input"}
          img={Loupe}
          button={<Button>Find now</Button>}
        />

        <Filter
          options={categories}
          value={filter}
          disabled={false}
          onChange={(values: optionType[]) => {
            setFilter(values);
          }}
          pluralizeOptions={(value) => {
            return value.toString();
          }}
        />
      </div>
      <Total filter={[]} />
      <ProductList filter={filter} limit={limit}/>
    </div>
  );
};

export default Products;
