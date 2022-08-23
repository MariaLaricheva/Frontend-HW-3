import { Link } from 'react-router-dom';
import "./Header.css"

const Header = () => (
    <header>
        <Link to="/">Products</Link>
        <Link to="/product:id">Product detail</Link>
        <Link to="/services">Services</Link>
        <Link to="/article">Article</Link>
        <Link to="/about">About Us</Link>
    </header>
);

export default Header;