import React, { useContext, } from 'react';
import cls from './Header.module.scss'
import { appContext } from '../../App';
import getBill from '../../utils/getBill';
import { Link } from 'react-router-dom';

const Header = () => {
    const { setIsCartOpen, cartSneakers } = useContext(appContext)
    const bill = getBill(cartSneakers)
    function openCart() {
        setIsCartOpen(true)
    }

    return (
        <header className={cls.header + " d-flex justify-between align-center p-30"}>
            <Link to={'/'}>
                <div className={cls.headerLeft + " d-flex align-center"}>
                    <img alt='' src="/img/logo.png" />
                    <div>
                        <h3>REACT SNEAKERS</h3>
                        <p className='opacity-5'>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={cls.headerRight + " d-flex align-center"}>
                <li
                    className='cu-p'
                    onClick={openCart}
                >
                    <img alt='' src="/img/cart.svg"
                        className='mr-10'
                        height={23}
                    />
                    <span>{bill} руб.</span>
                </li>
                <li >
                    <Link to={'/favorites'}>
                        <img src='/img/heart.svg' alt='Закладки' />
                    </Link>
                </li>
                <li>
                    <img alt='' src="/img/user.svg" height={23} />
                </li>
            </ul>
        </header >
    );
};

export default Header;