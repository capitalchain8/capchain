import React from 'react';
import styles from '../Home.module.css';
import { NewPhoneFormContainer } from './NewPhoneFormContainer';


export const NewPhoneCom = () => {
  
  return (
    <><div className={styles.UpdateformScreen} >
      <div className={styles.timeline} >
        <NewPhoneFormContainer/>
    
      </div>

    </div>
    </>
  )
}
