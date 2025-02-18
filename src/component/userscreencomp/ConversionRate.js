import React from 'react';
import styles from './conversion.module.css';
import { Submit } from './Submit';
import { useSelector} from "react-redux";

export const ConversionRate = ({buttonClick,deleteHandler, continueHandler,point}) => {

  let { color } = useSelector(state => state.userAuth)

  return (
    <div style={{backgroundColor:color.background}} className={styles.conversionContainer} >
        <Submit 
        buttonClick={buttonClick} 
        deleteHandler={deleteHandler}  
        continueHandler={ continueHandler}
        point={point}/>
    </div>
  )
}
