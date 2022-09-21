import React, { useCallback } from 'react'

import Button, { ButtonColor } from 'components/Button/Button'

import deleteIcon from 'static/delete.png'

import { useRootStore } from 'context/StoreContext'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import styles from './Cart.module.scss'
import { ProductTypeModel } from 'store/models'

const Cart = () => {

  const { cartStore } = useRootStore();

  let navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(`/`, { replace: true })
  }, [])

  const checkItem = useCallback((product: ProductTypeModel) => {
    navigate(`/product/${product.id}`, { replace: true })
  }, [])

  const deleteItem = useCallback((item: ProductTypeModel) => {
    cartStore.deleteItem(item)
  }, [])

  const increaseItem = useCallback((item: ProductTypeModel) => {
    cartStore.increaseQuantity(item)
  }, [])

  const decreaseItem = useCallback((item: ProductTypeModel) => {
    cartStore.decreaseQuantity(item)
  }, [])

  return (
    <div className={styles.cart}>
      <h1 className={styles.heading}>Cart</h1>

      {cartStore.length !== 0 &&
        (<div className={styles.item_list}>
            {cartStore.cartItems.map(item =>
            <div className={styles.item}>
              <img src={item.product.image} className={styles.picture}
              onClick={() => checkItem(item.product)}
              />
              <h3 className={styles.title}
                  onClick={() => checkItem(item.product)}
              >{item.product.title}</h3>

<div className={styles.button_group}>
  <h3 className={styles.price}>${item.product.price}</h3>
              <Button onClick={() => increaseItem(item.product)}
                      color={ButtonColor.secondary}
                      className={styles.button}
              >+</Button>
              <h3 className={styles.title}
              >{item.quantity}</h3>
              <Button onClick={() => decreaseItem(item.product)}
                      color={ButtonColor.secondary}
                      className={styles.button}
              >-</Button>
              <Button onClick={() => deleteItem(item.product)}
                      color={ButtonColor.secondary}
                      className={styles.button}
              >
                <img src={deleteIcon} style={{width: '15px'}} alt='del'/>
              </Button>
</div>
            </div>
          )}

          <h3 className={styles.total}>Total: ${cartStore.sum}</h3>
       </div>)
      }

      {cartStore.length === 0 &&
        <div className={styles.cart}>
        <h3 className={styles.title}>No items</h3>
        <Button onClick={goBack}
        color={ButtonColor.secondary}
                className={styles.button}
        >
        Back to shopping
        </Button>
        </div>
      }

    </div>
  )
}

export default observer(Cart);
