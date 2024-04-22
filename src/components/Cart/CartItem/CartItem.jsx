import React, { useContext, useEffect } from 'react';
import cls from './CartItem.module.scss'
import axios from 'axios';
import { appContext } from '../../../App';

const CartItem = ({ title, price, id, imageUrl, }) => {
    const { cartSneakers, setCartSneakers } = useContext(appContext)

    function removeFromCart() {
        try {
            axios.delete('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart/' + id)
            const newSneakers = cartSneakers.filter(elem => elem.id != id)
            setCartSneakers(newSneakers)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className={cls.cartItem + " d-flex align-center mb-25"}>
            <div className={cls.cartItemImg} style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className='mr-20 ml-20'>
                <p>{title}</p>
                <b>{price} руб.</b>
            </div>
            <img
                src="/img/btn-remove.svg"
                alt="remove"
                className={cls.removeBtn}
                width={32}
                onClick={removeFromCart}
            />
        </div>
    );
};

export default CartItem;