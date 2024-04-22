import React from 'react';
import Card from '../components/Card/Card';

const Home = ({ searchValue, setSearchValue, searchedSneakers, cartSneakers, areSneakersReady }) => {
    function renderSneakers(areSneakersReady) {
        return (
            areSneakersReady
                ? searchedSneakers
                : [...Array(15)]
        ).map((pair, index) =>
            <Card
                key={index}
                title={areSneakersReady ? pair.title : null}
                price={areSneakersReady ? pair.price : null}
                pairObj={areSneakersReady ? pair : null}
                index={areSneakersReady ? pair.index : null}
                isInCart={areSneakersReady ? cartSneakers.some(elem => elem.index === pair.index) : false}
            />
        )
    }
    return (
        <div className="content p-30">
            <div className='d-flex justify-between align-center mb-40'>
                {searchValue
                    ? <h1>Поиск по запросу: {searchValue}</h1>
                    : <h1>Все кроссовки</h1>
                }
                <div className="search-block d-flex align-center">
                    <img
                        src='/img/search.svg'
                        alt='search'
                        className='mr-5 lupa'
                    />
                    <input
                        type="text"
                        placeholder='Поиск...'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue &&
                        <img
                            className='removeSearch'
                            alt='Отмена'
                            src='/img/btn-remove.svg'
                            onClick={() => setSearchValue('')}
                        />}
                </div>
            </div>
            <div className='sneakers d-flex'>
                {renderSneakers(areSneakersReady)}
            </div>
        </div>
    );
};

export default Home;