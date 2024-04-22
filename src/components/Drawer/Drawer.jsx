import React, { useContext } from 'react';
import cls from './Drawer.module.scss'
import Cart from '../Cart/Cart';
import { appContext } from '../../App';

const Drawer = () => {
    const { isCartOpen } = useContext(appContext)

    const drawerClasses = [cls.drawer]
    if (isCartOpen) {
        drawerClasses.push(cls.open)
    }

    return (
        <div
            className={drawerClasses.join(' ')}
            onClick={(e) => e.stopPropagation()}
        >
            <Cart />
        </div>
    );
};

export default Drawer;