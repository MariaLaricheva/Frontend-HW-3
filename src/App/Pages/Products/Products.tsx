import "./Products.scss";
import {useEffect, useState} from 'react';
import axios from "axios";
import ProductList from "@components/ProductList/ProductList";
import Button from "@components/Button/Button";
import Filter from "@components/Filter";
import Input from "@components/Input";
import {Option} from "@components/MultiDropdown/MultiDropdown";
import Loupe from "@static/search-normal.svg";
import Total from "@components/Total";

const Products = () => {

    const [categories, setCategories] = useState<Option[]>([]);
    const [limit, setLimit] = useState<number>(6);
    const [filter, setFilter] = useState<Option[]>([]);

    useEffect(() => {
        fetch();
        setLimit(6);
    },[filter]);


    const fetch = async () => {
        const result = await axios({
            method: 'get',
            url: 'https://fakestoreapi.com/products/categories'
        });
        console.log('result', result);
        setCategories(result.data.map((raw: string, index: number) =>
            ({
                key: index,
                value: raw.toString(),
            })));
        console.log('categories', categories);
    };

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
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


            <Filter options={categories}
                           value={filter}
                           disabled={false}
                           onChange={(values: Option[]) => {
                               console.log('Выбрано:', values);
                               setFilter(values);
                            }
                            }
                           pluralizeOptions={(value) => {return value.toString()}}
            />
        </div>
        <Total filter={[]}/>
        <ProductList filter={filter} limit={limit}></ProductList>
        <nav></nav>
    </div>
    );
};

export default Products;
