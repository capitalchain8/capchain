import React from 'react';
import { truncate } from '../../../utils/functions';
import styles from './About.module.css';
import { useSelector } from "react-redux";

export const About = ({coin}) => {
  let { color } = useSelector(state => state.userAuth)


  return (
    <div className={styles.about} style={{backgroundColor:color.background}}>
      <h1 style={{color:color.importantText}}>About {coin.id}</h1>
      <p style={{color:color.normalText}}>
      {truncate(coin.description.en, 300)}
      </p>

    </div>
  )
}
