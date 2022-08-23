import "./ProductDetail.css";
import {PRODUCTS} from '../../config/products';
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
    // Получаем из урла айди товара
    // (id, поскольку записали :id в path роута)
    const { id } = useParams();

    // Находим в конфиге товар с таким айди
    const product = PRODUCTS.find(product => product.id === id);

    // Выводим имя найденного товара
    return (
        <div>
            {id}
        </div>
    );
};

export default ProductDetail;