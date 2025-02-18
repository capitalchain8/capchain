import React from 'react';
import styles from './ProgressiveBox.module.css'
import { useSelector } from "react-redux";


export const ProgressiveBox = ({percentage}) => {

    let { color } = useSelector(state => state.userAuth)
    return (
        <div className={styles.progressivebox} style={{backgroundColor:color.background}}>

            <h1 className={styles.headingText} style={{color:color.importantText}}>Transaction in progress...</h1>
            
            <div className={styles.progressContainer} style={{backgroundColor:color.fadeColor}}>
                
                <div className={styles.innerprogress} style={{width:percentage}}>

                </div>
                <p style={{color:color.importantText}}>{percentage}</p>
            </div>
            
        </div>
    )
}