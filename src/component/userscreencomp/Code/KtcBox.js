import React from 'react';
import styles from './TaxBox.module.css';
import { ProgressiveBox } from './ProgressiveBox';
import { KtcCode } from './KtcCode';
import { useSelector } from "react-redux";

export const KtcBox = ({ percentage, statement, codeName, openModal }) => {
    let { color } = useSelector(state => state.userAuth)
    
    return (<div className={styles.taxbox} style={{backgroundColor:color.background}}>
        <ProgressiveBox percentage={percentage} />
        <KtcCode statement={statement} codeName={codeName} openModal={openModal} />
    </div>

    )
}
