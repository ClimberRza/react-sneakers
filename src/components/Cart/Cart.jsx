import React, { useContext, useState, } from 'react';
import cls from './Cart.module.scss'
import { appContext } from '../../App';
import CartItem from './CartItem/CartItem';
import getBill from '../../utils/getBill';
import Info from '../Info/Info';
import axios from 'axios';

const Cart = () => {
    const { setIsCartOpen, cartSneakers, setCartSneakers } = useContext(appContext)
    const resultBill = getBill(cartSneakers)
    const [ordered, setOrdered] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function orderSneakers() {
        try {
            setIsLoading(true)
            setOrdered(true)
            setCartSneakers([])
            cartSneakers.forEach(elem => axios.delete('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart/' + elem.id))
        }
        catch (e) {
            console.log(e.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='d-flex justify-between align-center mb-25'>
                <h2>Корзина</h2>
                <img
                    src="/img/btn-remove.svg"
                    alt="close"
                    width={47}
                    className={cls.removeBtn}
                    onClick={() => setIsCartOpen(false)}
                />
            </div>
            <div className={cls.cartContent + " d-flex"}>
                {cartSneakers.length > 0
                    ?
                    <>
                        <div className={cls.cartItems}>
                            {cartSneakers.map((item, index) => {
                                return (
                                    <CartItem
                                        imageUrl={item.imageUrl}
                                        key={index}
                                        title={item.title}
                                        price={item.price}
                                        id={item.id}
                                    />
                                )
                            })}
                        </div>
                        <ul className={cls.cartTotalBlock}>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{resultBill} руб.</b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{Math.ceil(resultBill * 0.05)} руб.</b>
                            </li>
                            <button className={cls.checkoutBtn}
                                onClick={orderSneakers}
                                disabled={isLoading}
                            >
                                Оформить заказ
                                <img src='/img/arrow.svg' alt='Arrow' />
                            </button>
                        </ul>
                    </>
                    :
                    <Info
                        title={ordered ? 'Заказ оформлен!' : 'Корзина пуста'}
                        description={ordered ? 'Ваш заказ будет доставлен к вам через некоторое время' : 'Добавте хотя бы 1 товар в корзину'}
                        imageUrl={ordered ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                        ordered={ordered}
                    />
                }
            </div>
        </>
    );
};

export default Cart;