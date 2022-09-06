import { useEffect, useState } from "react";

import Button from "@components/Button/Button";
import Card from "@components/Card";
import Filter from "@components/Filter";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { optionType } from "@components/MultiDropdown/MultiDropdown";
import Total from "@components/Total";
import Loupe from "@static/search-normal.svg";
import { Meta } from "@utils/meta";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useRootStore } from "../../../context/StoreContext";
import { useQueryParamStoreInit } from "../../../store/RootStore/hooks/useQueryParamStoreInit";
import styles from "./Products.module.scss";


const Products = () => {

  useQueryParamStoreInit();

  const [categories, setCategories] = useState<optionType[]>([]);
  const [limit, setLimit] = useState(3);
  const [filter, setFilter] = useState<optionType[]>([]);
  let [searchParams, setSearchParams] = useSearchParams();
  //переменная для вставки в строку инпут
  const searchTerm = searchParams.get('search') || '';

  const { productStore } = useRootStore();

  //колбек в onChange инпута
  let changeSearchParam = (value: string) => {
    if (value) {
      setSearchParams({search: value});
      //обнулить hasmore у продактСтора
    }
    else {
      setSearchParams({})
      //productStore.getProducts()
      //обнулить hasMore у продактСтора
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("продукты загружены ёпт")
    productStore.searchProduct();
  }, [searchTerm])


  useEffect(() => {
    productStore.getProducts();
    // eslint-disable-next-line no-console
    console.log("продукты загружены ёпт")
  }, [productStore])


  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("поменялся лимит")

    productStore.fetchMore();
    // eslint-disable-next-line no-console
    console.log("вызываем фетч мор ")
  }, [limit])

  useEffect(() => {
    fetch();
    setLimit(3);
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

  let navigate = useNavigate();

let searchBarValue: string = "";

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY + 5 >= document.body.offsetHeight) {
        setLimit(limit + 1);
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
          placeholder={"Search"}
          value={searchTerm}
          onChange={changeSearchParam}
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
      <div className={styles.product__list}>
        {(productStore.meta===Meta.error) && <div>can't find products</div>}
        {(productStore.meta!==Meta.error) &&
          productStore.products?.map(
            (product) =>
              product && (
                <Card
                  key = {product.id}
                  image={product.image}
                  title={product.title}
                  subtitle={product.category}
                  onClick={() => {
                    navigate(`/product/${product.id}`, { replace: true });
                  }}
                />
              )
          )}
        {(productStore.meta===Meta.loading) && <Loader/>}
        {(!productStore.hasMore) &&
          <div>
            больше нет!! {limit}
          </div>
        }

      </div>
    </div>
  );
};

export default observer(Products);
