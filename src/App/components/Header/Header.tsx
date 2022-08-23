import {Link, useParams} from 'react-router-dom';
import "./Header.scss"

import Bag from '../../../static/bag.svg'
import Logo from '../../../static/logo.svg'
import User from '../../../static/user.svg'
import Name from '../../../static/name.svg'

const Header = () => {
    const { pageName } = useParams();

    function isSelected(address: string){
        if (pageName === address){
            return true;
        }
        return false;
    }


    return(
    <header  className={'header'}>
        <div className={'header-left'}>
            <img src={Logo}   className={'header-img'}></img>
            <img src={Name}   className={'header-logo'}></img>
        </div>
        <div className={'header-middle'}>
            <Link to="/"            className={'header-link, header-link__selected'}>Products</Link>
            <Link to="/services"    className={'header-link'}>Services</Link>
            <Link to="/article"     className={'header-link'}>Article</Link>
            <Link to="/about"       className={'header-link'}>About Us</Link>
        </div>
        <div className={'header-right'}>
            <img src={Bag}    className={'header-img'}></img>
            <img src={User}   className={'header-img'}></img>
        </div>
    </header>
);
};

export default Header;