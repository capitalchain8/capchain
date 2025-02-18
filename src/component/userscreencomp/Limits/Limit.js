import React from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { LimitBox } from './LimitBox';
import { useSelector } from "react-redux";



export const LimitsCom = () => {
    let { user, color } = useSelector(state => state.userAuth)

    return (<>

        <div className={styles.profileSettingScreen}  style={{backgroundColor:color.background,height: '89vh'}}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <LimitBox />
            </div>
            <div className={styles.rightBar} style={{backgroundColor:color.background}}>

            </div>

        </div>
    </>



    )
}