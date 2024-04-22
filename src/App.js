import 'macro-css'
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import BackDrop from './components/BackDrop/BackDrop';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

export const appContext = createContext('none')

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartSneakers, setCartSneakers] = useState([])
    const [sneakers, setSneakers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [areSneakersReady, setAreSneakersReady] = useState(false)

    async function fetchSneakers() {
        try {
            const response = await axios.get('https://65c5def6e5b94dfca2e073b7.mockapi.io/sneakers')
            setSneakers(response.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async function getCartSneakers() {
        try {
            const response = await axios.get('https://65c5def6e5b94dfca2e073b7.mockapi.io/cart')
            setCartSneakers(response.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async function fetchAll() {
        setAreSneakersReady(false)
        await getCartSneakers()
        await fetchSneakers()
        setTimeout(() => {
            setAreSneakersReady(true)
        }, 1000)
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const searchedSneakers = sneakers.filter(pair => pair.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (
        <appContext.Provider value={{
            favorites,
            setFavorites,
            isCartOpen,
            setIsCartOpen,
            cartSneakers,
            setCartSneakers,
            searchValue,
            areSneakersReady
        }}>
            <div className="wrapper clear">
                <BackDrop />
                <Drawer />
                <Header />
                <Routes>
                    <Route path='/' exact element={
                        <Home
                            cartSneakers={cartSneakers}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            searchedSneakers={searchedSneakers}
                            favorites={favorites}
                            areSneakersReady={areSneakersReady}
                        />}
                    />
                    <Route path='/favorites' element={
                        <Favorites
                            cartSneakers={cartSneakers}
                            items={favorites}
                        />
                    } />
                </Routes>
            </div>
        </appContext.Provider>
    );
}

export default App;