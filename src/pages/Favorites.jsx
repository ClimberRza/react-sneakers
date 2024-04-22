import React, { useContext, useState } from 'react';
import Card from '../components/Card/Card';
import { appContext } from '../App';

const Favorites = ({ items, cartSneakers }) => {
    const { areSneakersReady } = useContext(appContext)
    const [nonRendering, setNonRendering] = useState([])

    useState(() => {
        setNonRendering([...items])
    }, [])

    return (
        <div className="content p-30">
            <h1 className='mb-25'>Мои закладки</h1>
            <div className='d-flex fav'>
                {nonRendering.map((pair, index) => {
                    return (
                        <Card
                            key={index}
                            title={areSneakersReady ? pair.title : null}
                            price={areSneakersReady ? pair.price : null}
                            pairObj={areSneakersReady ? pair : null}
                            index={areSneakersReady ? pair.index : null}
                            isInCart={areSneakersReady ? cartSneakers.some(elem => elem.index === pair.index) : false}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default Favorites;