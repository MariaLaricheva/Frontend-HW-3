import { useEffect } from "react";

import Button from "@components/Button";
import { ButtonColor } from "@components/Button/Button";
import Card from "@components/Card";
import Loader from "@components/Loader";
import { Meta } from "@utils/meta";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import { useRootStore } from "../../../context/StoreContext";
import styles from "./ProductDetail.module.scss";


const ProductDetail = () => {
  // Получаем из url id товара
  // (id, поскольку записали :id в path роута)
  const { id } = useParams();

  const { productDetailStore } = useRootStore();

  useEffect(() => {
    if (id) {
    productDetailStore.getProductDetailByID(id.toString());}
    // eslint-disable-next-line no-console
    console.log("поменялся айди, грузим товары")
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("поменялась мета: ", productDetailStore.meta)
  }, [productDetailStore])

  let navigate = useNavigate();

  // eslint-disable-next-line no-console
  console.log(productDetailStore.relItemsMeta)
  // eslint-disable-next-line no-console
  console.log(productDetailStore.relatedItems)

  return (
    <div>
      {(productDetailStore.meta === Meta.error) && <div>Такого нет уходите</div>}
      {(productDetailStore.meta === Meta.loading) ? <Loader className={styles.product__loader}/> :
      (productDetailStore.product && productDetailStore.meta === Meta.success) &&
        <div className={styles.product__display}>
          <img
            src={productDetailStore.product.image}
            alt={"изображение отсутствует"}
            className={styles.product__image}
          />
            <div>
              <h2 className={styles.product__name}>{productDetailStore.product.title}</h2>
              <h3 className={styles.product__category}>{productDetailStore.product.category}</h3>
              <p className={styles.product__description}>{productDetailStore.product.description}</p>
              <div className={styles.product__price}>{"$" + productDetailStore.product.price}</div>
              <div className={styles.product__actions}>
                <Button
                  color={ButtonColor.primary}
                  className={styles.product__actions__btn}
                > Buy now </Button>
                <Button
                  color={ButtonColor.secondary}
                  className={styles.product__actions__btn}
                > Add to chart </Button>
              </div>
            </div>
        </div>
      }
      {(productDetailStore.relItemsMeta !== Meta.error) &&
        <div>
          <h3 className={styles.product__other}>Related items</h3>
          {(productDetailStore.relItemsMeta === Meta.loading) && <Loader className={styles.product__loader}/> }
          {(productDetailStore.relItemsMeta === Meta.success) &&
            <div className={styles.product__related}>
              {productDetailStore.relatedItems.map(
              (product) =>
                product && (
                  <Card
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    subtitle={product.category}
                    onClick={() => {
                      navigate(`/product/${product.id}`, { replace: true });
                    }}
                  />
                )
            )}
          </div>
          }
        </div>
      }
    </div>
  );
};

export default observer(ProductDetail);
