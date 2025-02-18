import React from 'react';
import styles from './TransactionBox.module.css';
import { TransactionHistory } from './../TransactionHistory';



export const TransactionBox = ({transactions,selectAsset,selectCash,detailHandler}) => {

    return (
        <div className={styles.transactionbox}>
            <TransactionHistory width='100%' transactionData={transactions} selectAsset={selectAsset} selectCash={selectCash} detailHandler={detailHandler}/>
        </div>
    )
}
