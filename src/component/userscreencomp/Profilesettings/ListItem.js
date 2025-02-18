import React from 'react';
import styles from './ListItem.module.css';
import Switch from 'react-switch';
import { useSelector } from "react-redux";


const ListItem = ({ title, icon, type, navigateHandler, link, switchHandler,isSwitched }) => {

  let { user,color } = useSelector(state => state.userAuth)
  

  

  let changeHandler = async (checked, e) => {
    switchHandler(link)

  }



  return (<div className={styles.menulist} onClick={() => {
    if (type === 'icon') {
      navigateHandler(link)
    }
  }}>
    <p style={{color:color.normalText}}>{title}</p>
    {type === 'icon' ? <span className='material-icons' style={{color:color.normalText}}> {icon}</span> : <Switch uncheckedIcon={false} checkedIcon={false} checked={isSwitched} onChange={changeHandler} />}
  </div>
  )
}

export default ListItem