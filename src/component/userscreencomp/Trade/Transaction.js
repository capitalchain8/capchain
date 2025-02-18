import React from 'react';
import styles from './Transaction.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


export const Transaction = () => {
    let { color } = useSelector(state => state.userAuth)


    let navigate = useNavigate()
    let navigateHandler = ()=>{
        navigate('/transactions')
    }

    return (
        <div className={styles.transactionContainer} style={{backgroundColor:color.background}}>
            <div className={styles.transactionHead}>
                <h2 style={{color:color.importantText}}>Recent transactions</h2>
            </div>
            <div className={styles.transactionContent}>
                <p style={{color:color.normalText}}>click here to view your teansaction history</p>
                <button onClick={navigateHandler} style={{color:color.importantText}}>view</button>
            </div>



        </div>






    )
}