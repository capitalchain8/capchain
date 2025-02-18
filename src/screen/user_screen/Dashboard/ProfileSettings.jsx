import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Sidebar from '../../../component/userscreencomp/sidebar';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import { ProfilesettingsMenu } from './../../../component/userscreencomp/Profilesettings/Profilesetting';
import ChangeInfoModal from '../../../component/Modal/changeInfoModal';
import CloseAccountModal from '../../../component/Modal/closeAccountModal';
import PasswordModal from '../../../component/Modal/passwordModal';
import PinModal from './../../../component/Modal/pinModal';
import ConfirmPinModal from './../../../component/Modal/confirmPinModal';
import { useSelector } from "react-redux";



const ProfileSettings = () => {
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
        <div className={styles.sidebar}>
          <Sidebar status='Settings' />
        </div>

        <div className={styles.main} >
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Profile settings' />
          {/*actual home screen */}

          <ProfilesettingsMenu openInfoModal={openInfoModal} openCloseModal={openCloseModal} openPasswordModal={openPasswordModal} openPinModal={openPinModal} />
          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div >

    </>


  )
}

export default ProfileSettings