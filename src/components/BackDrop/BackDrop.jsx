import React, { useContext } from 'react';
import { appContext } from '../../App';
import cls from './BackDrop.module.scss'

const BackDrop = () => {
    const { setIsCartOpen, isCartOpen } = useContext(appContext)
    const backDropClasses = [cls.backDrop]
    if (isCartOpen) {
        backDropClasses.push(cls.opened)
    }

    return (
        <div
            style={{ visibility: isCartOpen ? 'visible' : 'hidden' }}
            className={backDropClasses.join(' ')}
            onClick={() => setIsCartOpen(false)}
        />
    );
};

export default BackDrop;