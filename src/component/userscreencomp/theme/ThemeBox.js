import React from 'react';
import styles from './ThemeBox.module.css';
import { Themes } from './Themes';
import { useSelector } from "react-redux";

export const ThemeBox = () => {
  let { color } = useSelector(state => state.userAuth)


  return (
    <div className={styles.themeBox} style={{backgroundColor:color.background}}>
        <Themes/>
        
    </div>
  )
}
