import "./Products.css";
import {PRODUCTS} from '../../config/products';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';

const Products = () => (
    <div>
        <ul>
            {PRODUCTS.map(product => (
                <li key={product.id}>
                    <Link to={`/user/${product.id}`}>
                        {product.name}
                    </Link>
                </li>))}
        </ul>
    </div>
);

export default Products;