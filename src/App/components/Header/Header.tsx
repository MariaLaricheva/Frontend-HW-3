import { useEffect } from "react";

import classNames from "classnames";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Bag from "../../../static/bag.svg";
import Logo from "../../../static/logo.svg";
import Name from "../../../static/name.svg";
import User from "../../../static/user.svg";
import styles from"./Header.module.scss";


const Header = () => {

  useEffect(() => {
    //стили (подсвечивание выбранной вкладки) должны поменяться при изменении адреса (??)
  }, [window.location.pathname]);

  function isSelected(address: string) {
     if (window.location.pathname === address){
       return true;
     }
     return false;
   }

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header_left}`}>
        <img src={Logo} className={`${styles.header_img}`} alt={"logo"}></img>
        <img src={Name} className={`${styles.header_img}`} alt={"name"}></img>
      </div>
      <div className={`${styles.header_middle}`}>
        <Link to="/" className={classNames([styles.header_link], {[styles.header_link__selected]: isSelected("/")})}>
          Products
        </Link>
        <Link to="/services" className={classNames([styles.header_link], {[styles.header_link__selected]: isSelected("/services")})}>
          Services
        </Link>
        <Link to="/article" className={classNames([styles.header_link], {[styles.header_link__selected]: isSelected("/article")})}>
          Article
        </Link>
        <Link to="/about" className={classNames([styles.header_link], {[styles.header_link__selected]: isSelected("/about")})}>
          About Us
        </Link>
      </div>
      <div className={`${styles.header_right}`}>
        <img src={Bag} className={`${styles.header_img}`} alt={"bag"}></img>
        <img src={User} className={`${styles.header_img}`} alt={"user"}></img>
      </div>
    </header>
  );
};

export default Header;
