import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TaxCode.module.css';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { sendTaxCode } from '../../../store/action/userAppStorage';
import { useSelector } from "react-redux";

export const TaxCode = ({ statement, codeName, openModal}) => {
  let [isCode, setIsCode] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let dispatch = useDispatch()

  let { color } = useSelector(state => state.userAuth)

  let changeCodeHandler = (e) => {
    setIsCode(e.target.value)
  }



  const submitHandler = async () => {
    if (!isCode) {
      return
    }
    setIsLoading(true)
    
    let res = await dispatch(sendTaxCode({
      taxCode:isCode
    }))

    if (!res.bool) {
      setIsLoading(false)
      openModal(res.message, false)
      return
    }
    setIsLoading(false)
    openModal(res.message, true)
    return
    //if tax code match,navigate to ust code
  }


  return (
    <div className={styles.taxbox} style={{backgroundColor:color.background}}>
      <h1 className={styles.header} style={{color:color.importantText}}>Federal {codeName} laws</h1>
      <p className={styles.taxStatement} style={{color:color.normalText}}>{statement.toUpperCase()}</p>
      <input placeholder={`Enter ${codeName} code here`} value={isCode} onChange={changeCodeHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}}/>

      <button onClick={submitHandler} style={{backgroundColor:color.fadeColor}}>{isLoading ?
        <Spinner size={15} color={'red'} speed={.5} /> : 'Continue'}</button>

    </div>
  )
}
