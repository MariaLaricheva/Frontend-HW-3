import { useEffect, useState } from "react";

import Button from "@components/Button";
import { ButtonColor } from "@components/Button/Button";
import ProductList from "@components/ProductList/ProductList";
import axios from "axios";
import { useParams } from "react-router-dom";

import ProductType from "../../../customTypes/productType";
import styles from "./ProductDetail.module.scss";


const ProductDetail = () => {
  // Получаем из url id товара
  // (id, поскольку записали :id в path роута)
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://fakestoreapi.com/products/" + id,
    });
    setProduct({
      id: result.data.id,
      title: result.data.title,
      category: result.data.category,
      description: result.data.description,
      image: result.data.image,
      price: result.data.price,
      rating: result.data.rating,
    });
  };

  //стоит заменить работу с undefined на null, ибо undefined - нечто непреднамеренное,
  // а null сразу даёт понять, что мы предполагаем, что product может быть ничем


  //заглушка чтобы не ругалось
  function getProduct() {
    if (product !== undefined) {
      return (
        <div className={styles.product__display}>
          <img
            src={product.image}
            alt={"изображение отсутствует"}
            className={styles.product__image}
          />
          <div>
            <h2 className={styles.product__name}>{product.title}</h2>
            <h3 className={styles.product__category}>{product.category}</h3>
            <p className={styles.product__description}>{product.description}</p>
            <div className={styles.product__price}>{"$" + product.price}</div>
            <div className={styles.product__actions}>
              <Button
                color={ButtonColor.primary}
                className={styles.product__actions__btn}
              >
                Buy now
              </Button>
              <Button
                color={ButtonColor.secondary}
                className={styles.product__actions__btn}
              >
                Add to chart
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return "грузимся";
    }
  }

  const getCategory = () => {
    if (typeof product !== "undefined") {
      return product.category;
    } else {
      return "jewelery";
    }
  };

  // Выводим  найденного товара
  return (
    <div>
      {getProduct()}
      <h3 className={styles.product__other}>Related items</h3>
      {product && (
        <ProductList
          filter={[{ key: "0", value: getCategory() }]}
          limit={3}
        />
      )}
    </div>
  );
};

export default ProductDetail;
