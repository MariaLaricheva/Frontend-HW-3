import "./Products.scss";
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../../../@custom-types/product";
import ProductList from "../../components/ProductList/ProductList";
import Button, {ButtonProps} from "../../components/Button/Button";
import Filter from "../../components/Filter";
import Input from "../../components/Input";
import {Option} from "../../components/MultiDropdown/MultiDropdown";
import Loupe from "../../../static/search-normal.svg";
import Total from "../../components/Total";

const Products = () => {

    const [categories, setCategories] = useState<Array<Option>>([])
    const [limit, setLimit] = useState<number>(6)
    const { id } = useParams();

    useEffect(() => {fetch()},[]);

    const fetch = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://fakestoreapi.com/products/categories'
        });
        console.log('result', result);
        setCategories(result.data.map((raw: string, index: number) =>
            ({
                id: index,
                title: raw.toString(),
            })));
        console.log('categories', categories);
    };

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight) {
            console.log('МЫ ВНИЗУ');

            if (limit < 20) {
                setLimit(limit+3);
                console.log('добавим элементов');
            }
            else {
                console.log('нет больше элементов!!!');
            }
        }
    };


    return (
    <div>

        <h1 className={'product-heading'}>Products</h1>
        <p className={'product-paragraph'}>
            We display products based on the latest products we have, if you want
            to see our old products please enter the name of the item
        </p>

        <div className={'product-search'}>
            <Input type={"text"} value={"Search"} onChange={() => {} } className={'search-bar-input'}
                                       img={Loupe}
                                       button={<Button>Find now</Button>}
            ></Input>


            <Filter options={[
                { key: 'msk', value: 'Москва' },
                { key: 'spb', value: 'Санкт-Петербург' },
                { key: 'ekb', value: 'Екатеринбург' }
            ]}
                           value={[{ key: 'msk', value: 'Москва' }]}
                           disabled={false}
                           onChange={([{ key, value }]: Option[]) => console.log('Выбрано:', key, value)}
                           pluralizeOptions={(value) => {return value.toString()}}
            />
        </div>
        <Total filter={[]}/>
        <ProductList filter={[]} limit={limit}></ProductList>
        <nav></nav>
    </div>
    );
};

export default Products;
