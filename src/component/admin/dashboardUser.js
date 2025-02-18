import React from 'react';
import styles from './dashboardUser.module.css';

let DashboardUser = ({ username, email, imageUrl, navigateHandler, id,deleteHandler }) => {

  const truncate = (str, len) => {
    if (str.length > len) {
      if (len <= 3) {
        return str.slice(0, len - 3) + "...";
      }
      else {
        return str.slice(0, len) + "...";
      };
    }
    else {
      return str;
    };
  };



  return <div className={styles.dashboard_main_user} >
    <div className={styles.dashboard_main_user_imgCon}>
      {imageUrl ? <img src={imageUrl} /> : <i className='material-icons' style={{ color: 'grey', fontSize: 50 }}>person</i>}
    </div>
    <div className={styles.dashboard_main_user_infoCon} onClick={() => navigateHandler(id)}>
      <h2>{truncate(username, 18)}</h2>
      <p>{truncate(email, 15)}.com</p>
    </div>
    <div className={styles.dashboard_main_user_iconCon} onClick={()=>deleteHandler(id)}>
      <span className='material-icons'>delete</span>

    </div>


  </div>
}



export default DashboardUser