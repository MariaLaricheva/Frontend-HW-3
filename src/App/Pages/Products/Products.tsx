import "./Products.css";
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../../../@custom-types/product";

const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://fakestoreapi.com/products'
            });
            console.log('result', result);
            setProducts(result.data.map((raw: { id: any; title: any; }) =>
                ({
                    id: raw.id,
                    title: raw.title
                })));
        };
        fetch();
        },        [])          // при пустом массиве коллбек вызывается
                                    // только при появлении компонента в dom-дереве


    return (
    <div>
        <h1>Products</h1>
        <p>We display products based on the latest products we have, if you want
            to see our old products please enter the name of the item</p>
        <div>
            <input></input>
            <button>filter</button>
        </div>
        <h2>Total product</h2>
        <p>{products.length}</p>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <Link to={`/user/${product.id}`}>
                        {product.title}
                    </Link>
                </li>))}
        </ul>
        <nav></nav>
    </div>
    );
};

export default Products;