import React from 'react';
import styles from '../Home.module.css';
import { FrontVerificationBox } from './FrontVerificationBox';
import { useSelector } from "react-redux";




export const FrontVerificationCom = () => {
    let { color } = useSelector(state => state.userAuth)

    return (<>
       <div className={styles.taxScreen} 
        style={{ height: '89vh',backgroundColor:color.background }}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <FrontVerificationBox/>
            </div>
            
            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
              
            </div>
        </div>
    </>



    )
}