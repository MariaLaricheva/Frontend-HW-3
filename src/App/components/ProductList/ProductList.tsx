import {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../../../@custom-types/product";
import {Link} from "react-router-dom";
import Card from "../Card";
import product from "../../../@custom-types/product";


/** Пропсы, который принимает компонент Button */
export type ProductListProps = React.PropsWithChildren<{
    /** Категории товаров, которые нужно вывести*/
    filter: Array<string>;
    /** Ограничение на количество товаров*/
    limit?: number;
}>;

//возвращает массив карточек, отфильтрованных по выбранным категориям, с заданным лимитом
const ProductList: React.FC<ProductListProps> = ({filter, limit}) => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => { getData() },[])

    const fetch = async (address: string) => {
        const result = await axios({
            method: 'get',
            url: address
        });
        setProducts(products.concat(result.data.map((raw: { id: any; title: any; }) =>
            ({
                id: raw.id,
                title: raw.title
            }))));
    };
    const getData = () => {
        if (filter.length !== 0){
            filter.map((category: string) => {
                fetch('https://fakestoreapi.com/products/category/'+category+'?limit='+limit);
            })
        }
        else {
            fetch('https://fakestoreapi.com/products?limit='+limit);
        }
        console.log(products);
    }

    return (
            <div className={'product-list'}>
                {products?.map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            {product.title}
                        </Link>
                        {product &&
                        <Card image={product.image}
                              title={product.title}
                              subtitle={product.category}
                        /> }
                    </li>))}
            </div>
    );
};

export default ProductList;