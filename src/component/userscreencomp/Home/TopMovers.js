import React from 'react';
import styles from './TopMovers.module.css';
import Coin from './Coin';
import { useSelector } from "react-redux";

const TopMovers = ({coins}) => {
  let { color } = useSelector(state => state.userAuth)


  return (
    <div className={styles.topMovers} style={{backgroundColor:color.background}}>
          <div className={styles.headContainer}>
            <p style={{color:color.importantText}}>Top Movers</p>
            <p style={{color:color.importantText}}>See all</p>
          </div>

          <Coin coins={coins}/>

        </div>
  )
}

export default React.memo(TopMovers)