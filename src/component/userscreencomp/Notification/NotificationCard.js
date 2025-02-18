import React from 'react';
import styles from './NotificationCard.module.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";





export const NotificationCard = ({ topic, date, text, price, trade, }) => {
  let { color } = useSelector(state => state.userAuth)
  let navigate = useNavigate()

  return (
    <div className={styles.cardContainer} style={{backgroundColor:color.background}}>

      <div className={styles.timeContainer}>
        <span className='material-icons' style={{color:color.importantText}}> notifications</span>
        <p style={{color:color.importantText}}>{moment(date).from(moment())}</p>
      </div>

      <div className={styles.textContainer}>
        <p style={{color:color.normalText}}>{text}!</p>
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={()=>navigate('/home')} style={{backgroundColor:color.fadeColor,color:color.importantText}}>trade now</button>
      </div>


    </div>
  )
}
