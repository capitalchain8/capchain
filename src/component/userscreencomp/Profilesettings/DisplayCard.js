import React from 'react';
import styles from './AccountCard.module.css';
import ListItem from './ListItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


let accountCardData = [
  {
    link: '/theme',
    title: 'Appearance',
    icon: 'chevron_right',
    type: 'icon'
  }
]




export const DisplayCard = () => {
  let { user,color } = useSelector(state => state.userAuth)

  let navigate = useNavigate()

  let navigateHandler = (data) => {
    navigate(data)
  }



  return (
    <div className={styles.accountCard} style={{backgroundColor:color.background}}>
      <h1 style={{color:color.importantText}}>Display</h1>

      {accountCardData.map(data => <ListItem
        key={data.link} title={data.title} icon={data.icon} type={data.type} navigateHandler={navigateHandler} link={data.link} />)}


    </div>
  )
}