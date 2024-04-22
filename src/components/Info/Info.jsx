import React, { useContext } from 'react';
import { appContext } from '../../App';
import cls from './Info.module.scss'

const Info = ({title, description, imageUrl, ordered}) => {
    const {setIsCartOpen} = useContext(appContext)
    let height, width
    if (ordered) {
        height = '146px'
        width = '118px' 
    }
    else {
        height = '150px'
        width = '178px'
    }

    return (
        <div className={cls.info}>
            <div className={cls.box}>
                <img src={imageUrl} style={{height: height, width: width}} alt='something' />
                <h2 className={'mt-15'}>{title}</h2>
                <p className={'mt-5'}>{description}</p>
            </div>
            <button
                onClick={() => {
                    setIsCartOpen(false)
                }}
                className={cls.checkoutBtn}
            >
                <img src='/img/arrow.svg' alt='Arrow' />
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;