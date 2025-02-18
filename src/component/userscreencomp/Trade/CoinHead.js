import React from 'react';
import styles from './CoinHead.module.css';


export const CoinHead = ({buy,address}) => {

    return ( <ul className={styles.headlistCon}>
        <li className={styles.listName}>Name</li>
        <li className={styles.listPrice}>Price</li>
        <li className={styles.listChange}>Change</li>
        <li className={styles.listMarket}>Market Cap</li>
        {buy?<><li className={styles.listBuy}></li>
        <li className={styles.listWatch}>Watch</li></>:<></>}
        {address?<li className={styles.address}>Selected</li>:<></>}
    </ul>)
}