import "./ProductDetail.scss";
import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import Product from "../../../@custom-types/product";
import Button from "../../components/Button";
import { ButtonColor } from "../../components/Button/Button";
import ProductList from "../../components/ProductList/ProductList";

const ProductDetail = () => {
  // Получаем из url id товара
  // (id, поскольку записали :id в path роута)
  const [product, setProduct] = useState<Product>();
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

  //заглушка чтобы не ругалось
  function getProduct() {
    if (typeof product !== "undefined") {
      return (
        <div className={"product-display"}>
          <img
            src={product.image}
            alt={"изображение отсутствует"}
            className={"product-image"}
          ></img>
          <div>
            <h2 className={"product-name"}>{product.title}</h2>
            <h3 className={"product-category"}>{product.category}</h3>
            <p className={"product-description"}>{product.description}</p>
            <div className={"product-price"}>{"$" + product.price}</div>
            <div className={"product-actions"}>
              <Button
                color={ButtonColor.primary}
                className={"product-actions-btn"}
              >
                Buy now
              </Button>
              <Button
                color={ButtonColor.secondary}
                className={"product-actions-btn"}
              >
                Add to chart
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return "пппжжждите";
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
      <h3 className={"product-other"}>Related items</h3>
      {product && (
        <ProductList
          filter={[{ key: "0", value: getCategory() }]}
          limit={3}
        ></ProductList>
      )}
    </div>
  );
};

export default ProductDetail;
