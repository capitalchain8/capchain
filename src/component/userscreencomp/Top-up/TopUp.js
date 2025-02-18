import React, { useState } from 'react';
import styles from '../Home.module.css';
import { TopUpForm } from './TopUpForm';
import { useSelector } from "react-redux";



export const TopUpAccount = () => {
  let [email, setEmail] = useState("")
  let { color } = useSelector(state => state.userAuth)

  let changeEmail = (e) => {
    setEmail(e.target.value)

  }


  return (
    <><div className={styles.formScreen} style={{backgroundColor:color.background}}>
      <div className={styles.timeline}  style={{backgroundColor:color.background}}>

        <TopUpForm />
      </div>

    </div>
    </>
  )
}
