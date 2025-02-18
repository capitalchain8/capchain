import React, { useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { ThemeBox } from './ThemeBox';
import { useSelector } from "react-redux";



 const Theme = () => {
    
    let { color } = useSelector(state => state.userAuth)

    


    return (<>
        <div className={styles.profileSettingScreen}  style={{backgroundColor:color.background,height: '89vh'}}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <ThemeBox/>
            </div>
            <div className={styles.rightBar}>
                
            </div>
        </div>
    </>



    )
}

export default Theme