import React from 'react';
import styles from '../Home.module.css';
import { ConfirmFormContainer } from './ConfirmFormContainer';


export const ConfirmPhoneCon = () => {
  
  return (
    <><div className={styles.UpdateformScreen} >
      <div className={styles.timeline} >
        <ConfirmFormContainer/>
    
      </div>

    </div>
    </>
  )
}
