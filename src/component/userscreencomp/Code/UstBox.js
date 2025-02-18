import React from 'react';
import styles from './TaxBox.module.css';
import { ProgressiveBox } from './ProgressiveBox';
import { UstCode } from './UstCode';
import { useSelector } from "react-redux";

export const UstBox = ({percentage,statement,codeName,openModal}) => {
  let { color } = useSelector(state => state.userAuth)


  return (<div className={styles.taxbox}  style={{backgroundColor:color.background}}>
    <ProgressiveBox percentage={percentage} />
    <UstCode statement={statement} codeName={codeName} openModal={openModal}/>

  </div>
    
  )
}

