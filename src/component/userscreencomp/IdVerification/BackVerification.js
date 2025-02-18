import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { BackVerificationBox } from './BackVerificationBox';
import { useSelector } from "react-redux";



export const BackVerificationCom = () => {
    let [isLoading, setIsLoading] = useState(true)
    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        //asynchronous request
        let timeout = setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }
    })


    return (<>
        {isLoading && <Loader />}
        {!isLoading && <div className={styles.taxScreen} style={{ height: '89vh',backgroundColor:color.background }}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <BackVerificationBox/>
            </div>
            
            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
              
            </div>
        </div>}
    </>



    )
}