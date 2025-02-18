import React from 'react';
import styles from './tab.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



const TabFooter = ({status}) => {
  let navigate = useNavigate()
  let { color } = useSelector(state => state.userAuth)

  let tabData = [
    {
      icon: 'home',
      tabText: 'Home',
      link:'/home'
    },
    {
      icon: 'access_time',
      tabText: 'Assets',
      link:'/assets'
    },
    {
      icon: 'trending_up',
      tabText: 'Trade',
      link:'/trade'
    },
    {
      icon: 'toll',
      tabText: 'Pay',
      link:'/pay'
    }
  ]

  let handleNavigate = (data) => {
    navigate(data)
  }

  const iconColor = color.fadeColor? color.importantText:''
 const textColor = color.fadeColor? color.normalText : ' '


  return (
    <div className={styles.mobilefooter} style={{backgroundColor:color.background,borderBottom:`1px solid ${color.normalText?color.normalText:'#fff'}`}}>
      {tabData.map(data =>
        <div className={styles.tab} onClick={()=>handleNavigate(data.link)} key={data.link}>
          <span className='material-icons' style={{color:status===`${data.tabText}`?'#1652f0':iconColor }}>{data.icon}</span>
          <h3 style={{color:status===`${data.tabText}`?'#1652f0':textColor }}>{data.tabText}</h3>
        </div>

      )}



    </div>
  )
}

export default TabFooter