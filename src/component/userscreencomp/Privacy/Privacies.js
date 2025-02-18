import React from 'react';
import styles from './Privacies.module.css';
import { useSelector } from "react-redux";

export const Privacies = () => {
  let { user,color } = useSelector(state => state.userAuth)
  return (
    <div className={styles.privaciesContainer} style={{backgroundColor:color.background}}>
      <div className={styles.privacyCard} style={{backgroundColor:color.background}}>
        <p style={{color:color.normalText}}>Privacy policy</p>
        <span className='material-icons' style={{color:color.normalText}}>chevron_right</span>

      </div>

      <div className={styles.privacyCard}>
        <p style={{color:color.normalText}}>Cookie policy</p>
        <span className='material-icons' style={{color:color.normalText}}>chevron_right</span>

      </div>
      
    </div>
  )
}
