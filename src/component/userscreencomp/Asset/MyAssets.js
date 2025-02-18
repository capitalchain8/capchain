import React from 'react';
import styles from './MyAssets.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



export const MyAssets = () => {
    let { color } = useSelector(state => state.userAuth)

    let navigate = useNavigate()

    let navigateHandler = ()=>{
        navigate('/assets/buy')

    }


    return (<div className={styles.assets} style={{backgroundColor:color.background}}>

        <div className={styles.headingCon}>
            <h1 style={{color:color.importantText}}>My assets</h1>
        </div>

        <div className={styles.cryptoAssetCon}>
            <img src='../../graphics9.png' />
            <h2 style={{color:color.importantText}}>Get started with crypto</h2>
            <p style={{color:color.normalText}}>Your crypto assets will appear here.</p>
            <button onClick={navigateHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}}>
                Explore asset
            </button>
        </div>


    </div>)
}
