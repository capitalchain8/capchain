import React from 'react';
import styles from './PrivacyBox.module.css';
import { Privacies} from './Privacies';
import { useSelector } from "react-redux";

export const PrivacyBox = () => {
  let { user,color } = useSelector(state => state.userAuth)
  
  return (
    <div className={styles.limitbox} style={{backgroundColor:color.background}}>
        <div >
          <Privacies/>
        </div>

    </div>
  )
}
