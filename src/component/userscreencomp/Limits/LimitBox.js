import React from 'react';
import styles from './LimitBox.module.css'
import { Features } from './Features';
import { Verification } from './Verification';
import { useSelector } from "react-redux";

export const LimitBox = () => {
  let { user,color } = useSelector(state => state.userAuth)

  return (
    <div className={styles.limitbox}  style={{backgroundColor:color.background}}>
        <div >
          <Features/>
          <Verification/>
        </div>

    </div>
  )
}
