import "./Products.scss";
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from "axios";
import Product from "../../../@custom-types/product";
import ProductList from "../../components/ProductList/ProductList";
import Button, {ButtonProps} from "../../components/Button/Button";
import Filter from "../../components/Filter";
import Input from "../../components/Input";
import {Option} from "../../components/MultiDropdown/MultiDropdown";
import Loupe from "../../../static/search-normal.svg";

const Products = () => {


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
        <h2>Total product</h2>
        <ProductList filter={[]}></ProductList>
        <nav></nav>
    </div>
    );
};

export default Products;