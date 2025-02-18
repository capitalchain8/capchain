import React from 'react';
import styles from '../Home.module.css';
import { ChangeFormContainer } from './ChangeFormContainer';
import { useSelector } from "react-redux";

export const ChangePhoneCom = ({openInfoModal}) => {
   let { user,color } = useSelector(state => state.userAuth)
  
  return (
    <><div className={styles.UpdateformScreen} style={{backgroundColor:color.background}}>

      <div className={styles.timeline}  style={{backgroundColor:color.background}}>
        <ChangeFormContainer openInfoModal={openInfoModal}/>
      </div>

    </div>
    </>
  )
}
