import React from 'react';
import styles from './MyEarning.module.css';
import { useSelector } from "react-redux";

export const MyEarning = () => {
    let { color } = useSelector(state => state.userAuth)


    return (
        <div className={styles.myearning} style={{backgroundColor:color.background}}>

            <div className={styles.heading}>
                <h2 style={{color:color.importantText}}>My earnings</h2>
            </div>

            <div className={styles.about}>
                <div className={styles.imageCon}>
                    <img src='../../graphics8.png' />
                </div>


                <div className={styles.contentCon}>
                    <h2 style={{color:color.importantText}}>Learn and earn rewards</h2>
                    <p style={{color:color.normalText}}>see how we calculate earnings</p>

                </div>
            </div>
        </div>
    )
}
