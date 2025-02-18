import React, { useState } from 'react';
import styles from './Setting.module.css';
import { PaymentCard } from './PaymentCard';
import { AccountCard } from './AccountCard';
import { DisplayCard } from './DisplayCard';
import { SecurityCard } from './SecurityCard';
import { useDispatch } from "react-redux";
import { logout } from './../../../store/action/userAppStorage';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useSelector } from "react-redux";


export const SettingBox = ({ openInfoModal, openCloseModal, openPasswordModal, openPinModal }) => {
  let [isLoading, setIsLoading] = useState(false)


  let { user,color } = useSelector(state => state.userAuth)
  const dispatch = useDispatch()
  let navigate = useNavigate()


  let signoutHandler = async (data) => {
    navigate('/')
    //api to create new pin
    await dispatch(logout())


  }

  return (
    <div className={styles.settingbox} style={{backgroundColor:color.background}}>
      <PaymentCard />
      <AccountCard openInfoModal={openInfoModal} openCloseModal={openCloseModal} />
      <DisplayCard />
      <SecurityCard openPasswordModal={openPasswordModal} openPinModal={openPinModal} />

      <button className={styles.signoutbutton} onClick={signoutHandler} style={{backgroundColor:color.fadeButtonColor}}>{isLoading ?
        <Spinner size={15} color={'#fff'} speed={.5} /> : 'Signout'}</button>

    </div>
  )
}
