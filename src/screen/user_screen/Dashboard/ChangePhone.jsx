import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from '../../../component/Modal/tradeModal';
import { ChangePhoneCom } from './../../../component/userscreencomp/ChangePhone/ChangePhone';
import Modal from './../../../component/Modal/Modal';
import { useSelector } from "react-redux";





const ChangePhone = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let [isOpenInfoModal, setIsOpenInfoModal] = useState(false)
  let [isOpenInfoModalContent, setIsOpenInfoModalContent] = useState('')
  let { user,color } = useSelector(state => state.userAuth)

 

  

  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
    setIsOpenInfoModal(false)
  }



  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)
    setIsOpenInfoModal(false)
  }

  let closeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenInfoModal(false)
  }


  let openInfoModal = (data)=>{
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenInfoModalContent(data.message)
    setIsOpenInfoModal(true)
  }





  return (
    <>
    {isOpenInfoModal && <Modal content={isOpenInfoModalContent} closeModal={closeModal}/>}
    {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}

      <div className={styles.dashboard} style={{backgroundColor:color.background}}>
       

        <div className={styles.main} style={{width:'100%'}}>
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Phone numbers' />
          {/*actual home screen */}
          <ChangePhoneCom openInfoModal={openInfoModal}/>

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >

    </>


  )
}

export default ChangePhone