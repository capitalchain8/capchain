import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { VerificationBox } from './VerificationBox';
import { useSelector } from "react-redux";


export const IdVerificationCom = () => {
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
                <VerificationBox/>
            </div>
            
            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
              
            </div>
        </div>}
    </>



    )
}