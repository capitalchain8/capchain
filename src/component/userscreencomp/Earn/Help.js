import React from 'react';
import styles from './Help.module.css'
import HelpBox from './HelpBox';
import { useSelector } from "react-redux";

const Help = () => {
    let { color } = useSelector(state => state.userAuth)
    return (
        <div className={styles.help} style={{backgroundColor:color.background}}>

            <HelpBox/>
        </div>
    )
}

export default Help