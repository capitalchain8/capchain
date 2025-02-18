import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import { EarnAsset } from './../../../component/userscreencomp/Earn/Earn';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import SettingSidebar from './../../../component/userscreencomp/settingSideBar';
import { useSelector } from "react-redux";



const Earn = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let { color } = useSelector(state => state.userAuth)

  



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






  return (
    <>
      {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
      {isOpenTradeModal && <TradeModal closeModal={closeModal} />}

      <div className={styles.dashboard} style={{backgroundColor:color.background}}>
        <div className={styles.sidebar} >
          <SettingSidebar status='' />
        </div>

        <div className={styles.main} >
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal}  title='Earn' />
          {/*actual home screen */}

          <EarnAsset />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >
    </>



  )
}

export default Earn