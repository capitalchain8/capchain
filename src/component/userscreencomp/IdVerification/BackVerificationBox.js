import React from 'react';
import styles from './VerificationBox.module.css';
import { BackVerificationContainer } from './BackVerificationContainer';
import { useSelector } from "react-redux";

export const BackVerificationBox = () => {
  let { color } = useSelector(state => state.userAuth)
  return (
    <div className={styles.verificationbox} style={{backgroundColor:color.background}}>
        <BackVerificationContainer/>
    </div>
  )
}
