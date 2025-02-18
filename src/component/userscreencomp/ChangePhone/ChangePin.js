import React from 'react';
import styles from '../Home.module.css';
import { ChangePinContainer } from './ChangePinContainer';
import { useSelector } from "react-redux";


export const ChangePinCom = ({openPinModal}) => {
  let { user,color } = useSelector(state => state.userAuth)
  return (
    <><div className={styles.UpdateformScreen} style={{backgroundColor:color.background}} >
      <div className={styles.timeline}  style={{backgroundColor:color.background}}>
        <ChangePinContainer openPinModal={openPinModal}/>

      </div>

    </div>
    </>
  )
}