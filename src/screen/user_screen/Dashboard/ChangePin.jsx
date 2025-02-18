import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from '../../../component/Modal/tradeModal';
import { ChangePinCom } from './../../../component/userscreencomp/ChangePhone/ChangePin';
import ChangeInfoModal from '../../../component/Modal/changeInfoModal';
import CloseAccountModal from '../../../component/Modal/closeAccountModal';
import PasswordModal from '../../../component/Modal/passwordModal';
import PinModal from './../../../component/Modal/pinModal';
import ConfirmPinModal from './../../../component/Modal/confirmPinModal';
import { useSelector } from "react-redux";






const ChangePin = () => {
  //tradeModal and transfer modal
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let [isOpenInfoModal, setIsOpenInfoModal] = useState(false)
  let [isOpenCloseModal, setIsOpenCloseModal] = useState(false)
  let [isPasswordModal, setIsPassword] = useState(false)
  let [isPinModal, setIsPinModal] = useState(false)
  let [isConfirmPinModal, setIsConfirmPinModal] = useState(false)
  let [isPin, setIsPin] = useState('')
  let { user,color } = useSelector(state => state.userAuth)
  
 

  


    //for transfer and trade modal
    let openTradeModal = () => {
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(true)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
    }
  
    let openTransferModal = () => {
      setIsOpenTransferModal(true)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
    }
    
    let openInfoModal = () => {
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(true)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
  
    }
    let openCloseModal = async ()=>{
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(true)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
  
  
    }
  
     let openPasswordModal =()=>{
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(true)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
  
    }
  
    let openPinModal =()=>{
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(true)
      setIsConfirmPinModal(false)
  
    }
  
    let openConfirmPinModal =(pin)=>{
      setIsPin(pin)
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(true)
  
    }
  
  
    let closeModal = () => {
      setIsOpenTransferModal(false)
      setIsOpenTradeModal(false)
      setIsOpenInfoModal(false)
      setIsOpenCloseModal(false)
      setIsPassword(false)
      setIsPinModal(false)
      setIsConfirmPinModal(false)
    }
  






  return (
    <>
       {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}
    {isOpenInfoModal && <ChangeInfoModal closeModal={closeModal}/>}
    {isOpenCloseModal && <CloseAccountModal closeModal={closeModal}/>}
    {isPasswordModal && <PasswordModal closeModal={closeModal} openPinModal={openPinModal}/>}
    {isPinModal && <PinModal closeModal={closeModal} openConfirmPinModal={openConfirmPinModal}/>}
    {isConfirmPinModal && <ConfirmPinModal closeModal={closeModal} openConfirmPinModal={openConfirmPinModal} pin={isPin}/>}

      <div className={styles.dashboard} style={{backgroundColor:color.background}}>


        <div className={styles.main} style={{ width: '100%' }}>
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Change Pin' />
          {/*actual home screen */}
          <ChangePinCom openInfoModal={openInfoModal} openCloseModal={openCloseModal} openPasswordModal={openPasswordModal} openPinModal={openPasswordModal} />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >

    </>


  )
}

export default ChangePin