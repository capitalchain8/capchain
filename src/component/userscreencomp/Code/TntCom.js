import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { TntBox } from './TntBox';

import { useSelector } from "react-redux";



export const TntCom = ({openModal}) => {
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
            <div className={styles.pay} style={{backgroundColor:color.background}} >
                <TntBox
                    codeName='Tnt'
                    statement='According to the united transactions terms,Every transaction involving crypto assets will require TNT code from decentralized organisations.Enter code to complete transfer or contact our admin support if you do not have this code'
                    percentage='70%'
                    openModal={openModal}
                     />
            </div>

            <div className={styles.rightBar} style={{backgroundColor:color.background}}>

            </div>
        </div>}
    </>



    )
}