import {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../../../@custom-types/product";
import {Link} from "react-router-dom";

const ProductList = (filter: Array<any>, limit: number) => {

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
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/user/${product.id}`}>
                            {product.title}
                        </Link>
                    </li>))}
            </ul>
    );
};

export default ProductList;