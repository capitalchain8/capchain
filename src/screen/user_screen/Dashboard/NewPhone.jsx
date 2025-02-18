import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from '../../../component/Modal/tradeModal';
import { NewPhoneCom } from './../../../component/userscreencomp/ChangePhone/NewPhone';




const NewPhone = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)


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
    {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}

      <div className={styles.dashboard}>
       
        <div className={styles.main} style={{width:'100%'}}>
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Change phone' />
          {/*actual home screen */}
          <NewPhoneCom />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >

    </>


  )
}

export default NewPhone