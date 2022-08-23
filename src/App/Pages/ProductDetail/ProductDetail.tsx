import "./ProductDetail.css";
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";
import Product from "../../../@custom-types/product";

const ProductDetail = () => {
    // Получаем из урла айди товара
    // (id, поскольку записали :id в path роута)
    const [product, setProduct] = useState<Product>()
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://fakestoreapi.com/products/'+id
            });
            console.log('result', result);
            setProduct({
                id: result.data.id,
                title: result.data.title,
                category: result.data.category,
                description: result.data.description,
                image: result.data.image,
                price: result.data.price,
                rating: result.data.rating
            });
        };
        fetch();
    },        [])          // при пустом массиве коллбек вызывается
                                // только при появлении компонента в dom-дереве


    //заглушка чтобы не ругалось
    function getProduct(){
        if (typeof product !== 'undefined'){
            return (
                <div>
                    <img src={product.image}></img>
                    <div>
                        <h2>{product.title}</h2>
                        <h3>{product.category}</h3>
                        <p>{product.description}</p>
                        <div>{product.price}</div>
                        <div>
                            <button>Buy now</button>
                            <button>Add to chart</button>
                        </div>
                    </div>
                </div>

            );
        }
        else {return ("нет такого :)")}
    }

    // Выводим  найденного товара
    return (
        <div>
            {getProduct()}
            <h3>Related items</h3>

        </div>
    );
};

export default ProductDetail;