import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { Earning } from './Earning';
import Help from './Help';
import { useSelector } from "react-redux";


export const EarnAsset = () => {
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
        {!isLoading && <div className={styles.earnScreen} style={{ height: '89vh',backgroundColor:color.background }}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <Earning/>
                
            </div>

            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
                <Help/>

            </div>

           

        </div>}
    </>



    )
}