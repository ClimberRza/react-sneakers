import React, { useContext, useEffect, useState } from 'react';
import cls from './Card.module.scss'
import { appContext } from '../../App';
import axios from 'axios';
import ContentLoader from "react-content-loader"


const Card = ({ title, index, price, pairObj, isInCart }) => {
    const { cartSneakers, setCartSneakers, isCartOpen, favorites, setFavorites, searchValue, areSneakersReady } = useContext(appContext)
    const [addedToCart, setAddedToCart] = useState(isInCart)
    const [isFavorite, setIsFavorite] = useState(false)
    const [cardButtonLoading, setCardButtonLoading] = useState(false)

    useEffect(() => {
        if (isCartOpen && addedToCart && !cartSneakers.find((elem) => elem.index === index)) {
            setAddedToCart(false)
        }
        setAddedToCart(isInCart)
        setIsFavorite(favorites.find(elem => elem.index === pairObj.index) ? true : false)
    }, [cartSneakers, favorites, searchValue, areSneakersReady])

    function onClickFavorite() {
        if (!isFavorite) {
            setFavorites([...favorites, pairObj])
        }
        else {
            const newObj = [...favorites].filter(elem => elem.imageUrl !== pairObj.imageUrl)
            setFavorites(newObj)
        }
    }

    async function removeCartItem() {
        try {
            if (cardButtonLoading) {
                return
            }
            setCardButtonLoading(true)
            const response = await axios.get('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart')
            const id = response.data.find((item) => item.index === index)['id']
            axios.delete('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart/' + id)
            const newSneakers = cartSneakers.filter(elem => elem.id !== id)
            setAddedToCart(!addedToCart)
            setCartSneakers(newSneakers)
            setCardButtonLoading(false)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    async function addToCart() {
        try {
            if (cardButtonLoading) {
                return
            }
            setCardButtonLoading(true)
            await axios.post('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart', pairObj)
            const response = await axios.get('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart')
            setAddedToCart(!addedToCart)
            setCartSneakers([...response.data])
            setCardButtonLoading(false)
        }
        catch (error) {
            console.log(error.message);;
        }
    }

    return (
        <div className={cls.card}>
            {!areSneakersReady ?
                <ContentLoader
                    speed={2}
                    width={210}
                    height={300}
                    viewBox="0 0 210 303"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#eaeaec"
                >
                    <rect x="120" y="217" rx="10" ry="10" width="40" height="40" />
                    <rect x="0" y="0" rx="15" ry="10" width="160" height="120" />
                    <rect x="0" y="135" rx="6" ry="6" width="160" height="24" />
                    <rect x="0" y="170" rx="6" ry="6" width="115" height="24" />
                    <rect x="0" y="224" rx="7" ry="7" width="107" height="33" />
                </ContentLoader>
                :
                <>
                    <div className={cls.favourite + ' d-flex justify-center align-center'}
                        onClick={onClickFavorite}
                    >
                        <img src={isFavorite
                            ? '/img/liked.svg'
                            : 'img/unliked.svg'}
                            alt='favourite'
                        />
                    </div>
                    <div
                        className={cls.cardImg}
                        style={{ backgroundImage: `url(${pairObj.imageUrl})` }}
                    />
                    <h5>{title}</h5>
                    <div className={cls.info + ' d-flex justify-between align-center'} >
                        <div className={cls.price}>
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        <img
                            src={
                                addedToCart
                                    ? '/img/btn-checked.svg'
                                    : '/img/btn-plus.svg'
                            }
                            alt='plus'
                            onClick={() => {
                                if (addedToCart) {
                                    removeCartItem()
                                }
                                else {
                                    addToCart()
                                }
                            }}
                            className={cls.addToCartBtn}
                        />
                    </div>
                </>
            }
        </div>
    );
};

export default Card;