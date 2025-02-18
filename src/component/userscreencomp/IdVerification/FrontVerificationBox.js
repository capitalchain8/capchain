import React from 'react';
import styles from './VerificationBox.module.css';
import { FontVerificationContainer } from './FrontVerificationContainer';
import { useSelector } from "react-redux";

export const FrontVerificationBox = () => {
  let { color } = useSelector(state => state.userAuth)
  return (
    <div className={styles.verificationbox} style={{backgroundColor:color.background}}>
        <FontVerificationContainer/>
        
    </div>
  )
}
