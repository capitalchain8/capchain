import React from 'react';
import styles from './HelpBox.module.css';
import { useSelector } from "react-redux";

const HelpBox = () => {
    let { color } = useSelector(state => state.userAuth)


    return (
        <div className={styles.helpbox} style={{backgroundColor:color.background}}>

                <div className={styles.heading}>
                    <h2 style={{color:color.importantText}}>Help</h2>
                </div>

                <div className={styles.about}>
                    <div className={styles.imageCon}>
                        <img src='../../bulb.png' />
                    </div>


                    <div className={styles.contentCon}>
                        <h2 style={{color:color.importantText}}>Learn and earn rewards</h2>

                    </div>
                    <span className='material-icons' style={{color:color.importantText}}>
                        chevron_right
                    </span>
                </div>
            </div>
    )
}

export default HelpBox