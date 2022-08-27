import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Total.scss";

type TotalProps = {
    /** фильтр */
    filter: string[];
};

const Total: React.FC<TotalProps> = ({filter}) => {

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (filter.length !== 0){
            filter.map((category: string) => {
                fetch('https://fakestoreapi.com/products/category/'+category);
            })
        }
        else {
            fetch('https://fakestoreapi.com/products');
        }
    }, [])

    const fetch = async (address: string) => {
        const result = await axios({
            method: 'get',
            url: address
        });

        setTotal(total+result.data.length);
    };


    return(
        <div className={'total-wrapper'}>
            <h2 className={'total-heading'}>
                Total product
            </h2>
            <div className={'total-value'}>
                {total}
            </div>
        </div>
    );
}

export default Total;