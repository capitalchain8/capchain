import React from 'react';
import styles from './Reoccuring.module.css';
import { useSelector } from "react-redux";



export const Reoccuring = () => {
    let { color } = useSelector(state => state.userAuth)


    return (
        <div className={styles.reoccuringBuyCon} style={{backgroundColor:color.background}}>
            <div className={styles.heading}>
                <div className={styles.headingLeft}>
                    <h1 style={{color:color.importantText}}>Recurring buys</h1>
                </div>

                <div className={styles.headingRight}>
                    <p >Add new</p>

                </div>

            </div>
            <div className={styles.learnContainer}>
                <div className={styles.imgContainer}>
                    <img src='../../graphics8.png' />
                </div>

                <div className={styles.textContainer}>
                    <h3 style={{color:color.importantText}}>Learn aboout recurring buys</h3>
                    <p style={{color:color.normalText}}>Invest daily or weekly or month...</p>

                </div>

                <div className={styles.iconContainer}>
                    <span className='material-icons'>
                        navigate_next

                    </span>

                </div>

            </div>


        </div>


    )
}
