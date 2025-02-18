import React from 'react';
import styles from './TaxBox.module.css';
import { ProgressiveBox } from './ProgressiveBox';
import { TntCode } from './TntCode';

export const TntBox = ({percentage,statement,codeName,openModal}) => {
  return (<div className={styles.taxbox}>
    <ProgressiveBox percentage={percentage} />
    <TntCode statement={statement} codeName={codeName} openModal={openModal}/>

  </div>
    
  )
}