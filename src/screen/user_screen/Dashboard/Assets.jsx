import React, { useState,useEffect } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Tab from '../../../component/userscreencomp/tab'
import Sidebar from '../../../component/userscreencomp/sidebar';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import { AssetComponent } from '../../../component/userscreencomp/Asset/Asset';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';



const DashboardAsset = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)

 

  


  let showmenuHandler = () => {
    let drawer = document.querySelector('.drawerCon')
    drawer.classList.toggle('showdrawer')
  }


  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
  }



  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)

  }

  let closeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)

  }




  return (
    <>
      {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
      {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <Sidebar status='My asssets' />
        </div>

        <div className={styles.main}>
          {/*mobile and dashboard headers*/}
          <DashboardDrawer showmenuHandler={showmenuHandler} />
          <DashboardHeader showmenuHandler={showmenuHandler} openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Assets' />

          {/*actual home screen */}
          <AssetComponent />

          {/* footer*/}
          <div className={styles.tabCont}>
            <Tab status='Assets' />
          </div>
          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >
    </>



  )
}

export default DashboardAsset
