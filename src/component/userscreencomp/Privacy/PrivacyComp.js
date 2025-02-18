import React from 'react';
import styles from '../Home.module.css';
import { PrivacyBox } from './PrivacyBox';
import { useSelector } from "react-redux";



export const PrivacyCom = () => {
    let { user,color } = useSelector(state => state.userAuth)
    
    return (<>
        <div className={styles.profileSettingScreen}   style={{backgroundColor:color.background,height: '89vh'}}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <PrivacyBox/>
            </div>
            <div className={styles.rightBar}>
                
            </div>



        </div>
    </>



    )
}