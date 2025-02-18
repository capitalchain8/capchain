import React from 'react';
import styles from './PaymentCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


export const PaymentCard = () => {
  let { user,color } = useSelector(state => state.userAuth)
  let navigate = useNavigate()

  let navigateHandler = ()=>{
    navigate('/paymentinformation')
  }

  return (
    <div className={styles.paymentCard} style={{backgroundColor:color.background}}>
      <h1 style={{color:color.importantText}}>Payments methods</h1>

      <button onClick={navigateHandler} style={{backgroundColor:color.fadeButtonColor,color:color.normalText}}>Add a payment method</button>
    </div>
  )
}
