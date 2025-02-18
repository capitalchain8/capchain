import React,{useState} from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Tab from '../../../component/userscreencomp/tab'
import Sidebar from '../../../component/userscreencomp/sidebar';
import DashboardHeader from '../../../component/userscreencomp/dashboardNav';
import DashboardDrawer from '../../../component/userscreencomp/Drawer';
import { Pay } from './../../../component/userscreencomp/Pay/Pay';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import Modal from './../../../component/Modal/Modal';
import moment from 'moment';



const DashboardPay = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false)
  let [isOpenTransactionModalContent, setIsOpenTransactionModalContent] = useState('')


  let showmenuHandler = () => {
    let drawer = document.querySelector('.drawerCon')
    drawer.classList.toggle('showdrawer')
  }

  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
    setIsOpenTransactionModal(false)
  }



  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)
    setIsOpenTransactionModal(false)

  }

   let openTransactionModal = (data) => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenTransactionModal(true)

  
    let info = `${data.action} ${Number(data.amount).toFixed(2)}  ${data.nameOfCurrency}, ${moment(data.date).from(moment())}`
    setIsOpenTransactionModalContent(info)



  }

  let closeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenTransactionModal(false)

  }








  return (
    <>
    {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}
    {isOpenTransactionModal && <Modal content={isOpenTransactionModalContent} closeModal={closeModal}/>}

      <div className={styles.dashboard}>

        <div className={styles.sidebar}>
          <Sidebar status='Pay' />
        </div>

        <div className={styles.main}>
          {/*mobile and dashboard headers*/}
          <DashboardDrawer showmenuHandler={showmenuHandler} />
          <DashboardHeader showmenuHandler={showmenuHandler}  openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Pay' />
          {/*actual home screen */}
          <Pay openTransactionModal={openTransactionModal}/>


          {/* footer*/}
          <div className={styles.tabCont}>
            <Tab status='Pay' />
          </div>
          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div>
    </>



  )
}

export default DashboardPay
