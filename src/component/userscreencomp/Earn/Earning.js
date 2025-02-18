import React from 'react';
import styles from './Earning.module.css';
import { MyEarning } from './MyEarning';
import { BuyEarning } from './BuyEarning';
import Help from './Help';
import { useSelector } from "react-redux";




export const Earning = () => {
    let { color } = useSelector(state => state.userAuth)


    return (
        <div className={styles.earningbox} style={{backgroundColor:color.background}}>

            <MyEarning/>


            <BuyEarning/>

            <div className={styles.foot} style={{backgroundColor:color.background}}>
                <Help/>

            </div>


        </div>
    )
}
