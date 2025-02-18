import React, { useState,useEffect } from 'react';
import styles from './themes.module.css';
import Switch from 'react-switch';
import { changeTheme } from './../../../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


export const Themes = () => {
    let theme = localStorage.getItem('THEME')
    let [isSwitched, setIsSwitched] = useState(theme==='light'?true:false)

    let { color} = useSelector(state => state.userAuth)
    let dispatch = useDispatch()

    


    let changeHandler = async() => {
        //api to toggle background
        await dispatch(changeTheme(!isSwitched))
        setIsSwitched(prev=>!prev)  
    }



    return (
        <div className={styles.themesContainer} style={{backgroundColor:color.background}}>

            <div className={styles.themesCard} >
                <p style={{color:color.normalText}}>Enable light mode</p>
                <div className={styles.switchContainer}>
                    <Switch uncheckedIcon={false} checkedIcon={false} checked={isSwitched} onChange={changeHandler} />
                </div>
            </div>
        </div>
            )
}
