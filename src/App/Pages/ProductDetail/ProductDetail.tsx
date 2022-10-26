import React, { useEffect } from 'react'

import Button from 'components/Button'
import { ButtonColor } from 'components/Button/Button'
import Card from 'components/Card'
import Loader from 'components/Loader'
import { ProductTypeModel } from 'store/models'
import ProductDetailStore from 'store/ProductDetailStore'
import { Meta } from 'utils/meta'
import { useLocalStore } from 'utils/useLocalStore'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './ProductDetail.module.scss'

import Rating from 'components/Rating'
import { useRootStore } from 'context/StoreContext'


const ProductDetail = () => {
  // Получаем из url id товара
  // (id, поскольку записали :id в path роута)
  const { id } = useParams()

  const productDetailStore = useLocalStore(() => new ProductDetailStore())
  const { cartStore } = useRootStore()

  const addToCart = React.useCallback(
    (product: ProductTypeModel | null) =>
    {
      console.log("adding to cart")
      if (product) {
        cartStore.addItem(product)
      }
    }, [])

  const buyNow = React.useCallback(
    (product: ProductTypeModel | null) => {
      console.log("buying now")
      if (product) {
        cartStore.addItem(product)
        navigate(`/cart`, { replace: true })
      }
    },    [])

  useEffect(() => {
    if (id) {
      productDetailStore.getProductDetailByID(id.toString())
    }
  }, [id])

  let navigate = useNavigate()

  const onCardClick = React.useCallback(
    (product: ProductTypeModel) =>
      navigate(`/product/${product.id}`, { replace: true }),
    []
  )

  if (productDetailStore.product){
    return (
      <div className={styles.product}>

        {productDetailStore.meta === Meta.error && (
          <div className={styles.product__other}>Product not found</div>
        )}
        {productDetailStore.meta === Meta.loading ? (
          <Loader className={styles.product__loader} />
        ) : (
          productDetailStore.product &&
          productDetailStore.meta === Meta.success && (
            <div className={styles.product__display}>
              <img
                src={productDetailStore.product.image}
                alt="product image"
                className={styles.product__image}
              />
              <div>
                <h2 className={styles.product__name}>
                  {productDetailStore.product.title}
                </h2>
                <h3 className={styles.product__category}>
                  {productDetailStore.product.category}
                </h3>


                <div className={styles.rating}>
                  <h4 className={styles.heading}>
                    Rating
                  </h4>
                  <Rating rating={productDetailStore.product.rating.rate}/>
                  <p className={styles.info}>
                    Based on {productDetailStore.product.rating.count} reviews
                  </p>
                </div>

                <p className={styles.product__description}>
                  {productDetailStore.product.description}
                </p>



                <div className={styles.product__price}>
                  {'$' + productDetailStore.product.price}
                </div>
                <div className={styles.product__actions}>
                  <Button
                    color={ButtonColor.primary}
                    className={styles.product__actions__btn}

                    onClick={() => buyNow(productDetailStore.product)}
                  >Buy now

                  </Button>
                  <Button
                    color={ButtonColor.secondary}
                    className={styles.product__actions__btn}

                    onClick={() => addToCart(productDetailStore.product)}
                  >Add to Cart

                  </Button>
                </div>
              </div>
            </div>
          )
        )}
        {productDetailStore.relItemsMeta !== Meta.error && (
          <div>
            <h3 className={styles.product__other}>Related items</h3>
            {productDetailStore.relItemsMeta === Meta.loading && (
              <Loader className={styles.product__loader} />
            )}
            {productDetailStore.relItemsMeta === Meta.success && (
              <div className={styles.product__related}>
                {productDetailStore.relatedItems.map(
                  (product) =>
                    product && (
                      <Card
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        subtitle={product.category}

                        content={product.price}

                        onClick={() => onCardClick(product)}
                      />
                    )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  else {
    return (
      <div className={styles.product}>
        <h1>Product not found</h1>
        <Button color={ButtonColor.secondary}>Go back</Button>
      </div>
    )
  }
}

export default observer(ProductDetail)
