import React, { useState,useEffect} from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Tab from '../../../component/userscreencomp/tab'
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import { HomeComponent } from '../../../component/userscreencomp/Home/Home';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import Sidebar from './../../../component/userscreencomp/sidebar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const DashboardHome = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let { color } = useSelector(state => state.userAuth)

  let navigate = useNavigate()

 


  let showmenuHandler = () => {
    let drawer = document.querySelector('.drawerCon')
    drawer.classList.toggle('showdrawer')
  }


   useEffect(()=>{
    /*toast('Welcome to capchains.Top up your account and start trading now if your account is low!',{
      autoClose:20000,
      theme:`${color.background?'light':'dark'}`,
      hideProgressBar:true



      <ToastContainer
  autoClose={20000} theme='dark'
  hideProgressBar={true}>

  </ToastContainer>
    })*/

  },[toast])

  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
  }
  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)

  }

  let closeModal = ()=>{
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)

  }





  return (<>
  
    {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}

    <div className={styles.dashboard} style={{backgroundColor:color.background}}>
      <div className={styles.sidebar}>
        <Sidebar status='Home' />
      </div>

      <div className={styles.main}>
        {/*mobile and dashboard headers*/}
        <DashboardDrawer showmenuHandler={showmenuHandler} />
        <DashboardHeader showmenuHandler={showmenuHandler} openTradeModal={openTradeModal} openTransferModal={openTransferModal}  title='Home' />

        {/*actual home screen */}
        <HomeComponent buy={true} />

        {/* footer*/}
        <div className={styles.tabCont}>
          <Tab status='Home' />
        </div>
        <div className={styles.desktopFooterCont}>
          <Desktopfooter />
        </div>
      </div>
    </div>
  </>
  )
}

export default DashboardHome
