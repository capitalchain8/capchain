import React from 'react';
import styles from './VerificationBox.module.css';
import { VerificationContainer } from './VerificationContainer';
import { useSelector } from "react-redux";

export const VerificationBox = () => {
  let { color } = useSelector(state => state.userAuth)

  return (
    <div className={styles.verificationbox} style={{backgroundColor:color.background}}>
        <VerificationContainer/>
        
    </div>
  )
}
