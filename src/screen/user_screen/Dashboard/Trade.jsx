import React,{useState} from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Tab from '../../../component/userscreencomp/tab'
import Sidebar from '../../../component/userscreencomp/sidebar';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import { Trade } from '../../../component/userscreencomp/Trade/Trade';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';




const DashboardTrade = () => {
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
          <Sidebar status='Trade' />
        </div>

        <div className={styles.main}>
          {/*mobile and dashboard headers*/}
          <DashboardDrawer showmenuHandler={showmenuHandler} />
          <DashboardHeader showmenuHandler={showmenuHandler} openTradeModal={openTradeModal} openTransferModal={openTransferModal}
          title='Trade' 
          />
          {/*actual home screen */}
          <Trade buy={true} />


          {/* footer*/}
          <div className={styles.tabCont}>
            <Tab status='Trade' />
          </div>
          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >

    </>




  )
}

export default DashboardTrade
