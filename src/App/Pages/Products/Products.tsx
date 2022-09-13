import React, { useCallback, useEffect, useState } from 'react'

import Button from "components/Button/Button";
import Card from "components/Card";
import Filter from "components/Filter";
import Input from "components/Input";
import Loader from "components/Loader";
import { optionType } from "components/MultiDropdown/MultiDropdown";
import Loupe from "static/search-normal.svg";
import { ProductTypeModel } from 'store/models'
import ProductStore from 'store/ProductStore';
import { useQueryParamStoreInit } from 'store/RootStore/hooks/useQueryParamStoreInit';
import { Meta } from "utils/meta";
import { useLocalStore } from 'utils/useLocalStore';
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./Products.module.scss";

const Products = () => {

  useQueryParamStoreInit();

  const [categories, setCategories] = useState<optionType[]>([]);
  const [filter, setFilter] = useState<optionType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const productStore = useLocalStore(() => new ProductStore());

  //колбек в onChange инпута
  const changeSearchParam = React.useCallback(
    (value: string) => {
      if (value) {
        setSearchParams({search: value});
        productStore.toggleHasMore(true);
      }
      else {
        setSearchParams({})
        productStore.getProducts();
        productStore.toggleHasMore(true);
      }
  }, [productStore, setSearchParams]) //массив был пустой,
                                            // добавить туда productStore и setSearchParams подсказал линтер??

  useEffect(() => {
    productStore.getProducts();
  }, []) //если убрать пустой массив, перезагрузка происходит каждые полсекунды

  useEffect(() => {
    productStore.searchProduct();
  }, [productStore, searchTerm]) // линтер сказал добавить productStore ??

  useEffect(() => {
    fetch();
  }, [filter]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(productStore.total)
  }, [productStore.total]);

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

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY + 5 >= document.body.offsetHeight) {
        if (productStore.hasMore){
        productStore.fetchMore();
        }
    }
  };

  let navigate = useNavigate();

  const onCardClick = useCallback((product: ProductTypeModel) => {
    navigate(`/product/${product.id}`, { replace: true });
  }, [])

  return (
    <div>
      <h1 className={styles.product__heading}>Products</h1>
      <p className={styles.product__paragraph}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>

      <div className={styles.product__search}>
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={changeSearchParam}
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
      <div className={styles.product__total_wrapper}>
      <h1 className={styles.product__total_heading}>Total product </h1>
      <h1 className={styles.product__total_value}>{productStore.total}</h1>
      </div>
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
                  onClick={() => onCardClick(product)}
                />
              )
          )}
        {(productStore.meta===Meta.loading) && <Loader/>}
        {(!productStore.hasMore) &&
          <div>
            больше нет!!
          </div>
        }

      </div>
    </div>
  );
};

export default observer(Products);
