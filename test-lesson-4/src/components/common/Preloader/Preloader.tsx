import preloader from './../../../loader.svg';
import React from 'react';
import style from './Preloader.module.css';

let Preloader = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} />
        </div>
    );
}

export default Preloader;