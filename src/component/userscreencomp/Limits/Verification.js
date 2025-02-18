import React from 'react';
import styles from './feature.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


export const Verification = () => {
  let navigate = useNavigate()
  let { user,color } = useSelector(state => state.userAuth)

  
  return (
    <div className={styles.verification} style={{backgroundColor:color.background}}>
        <h1 style={{color:color.importantText}}>Feature upgrade available</h1>
        <p style={{color:color.normalText}}>Buy digital currency</p>
        <button onClick={()=>{
          navigate('/idverification')
        }} style={{color:color.importantText}}>Verify photo ID</button>
    </div>
  )
}
