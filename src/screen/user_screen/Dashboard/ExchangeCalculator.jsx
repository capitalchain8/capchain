import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import { useParams } from 'react-router-dom';
import { ConvertCalculator } from '../../../component/userscreencomp/ConvertCalculator/Calculator';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import Modal from './../../../component/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import AuthModal from './../../../component/Modal/AuthModal';
import SettingSidebar from './../../../component/userscreencomp/settingSideBar';
import { useSelector } from "react-redux";


const ExchangeCalculator = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isErrorModalInfo, setIsErrorModalInfo] = useState(false);
  const [userStatus, setUserStatus] = useState("")
  const [isOpenPin, setIsOpenPin] = useState()
  const [isOpenPinModalContent, setIsOpenPinModalContent] = useState(null)
  let { color } = useSelector(state => state.userAuth)

  let navigate = useNavigate()
 




  let { fromcoin} = useParams()



  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
    setIsOpenPin(false)
  }



  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)
    setIsOpenPin(false)

  }

  let closeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenPin(false)
  }

  //for navigation modal
  let resolveModal = () => {
    setIsErrorModal(false)
    setIsErrorModalInfo(``)
    setUserStatus('')
    navigate(`/assets/buy`)
  }


  let openModal = (data) => {
    setIsErrorModal(data.isErrorModal)
    setIsErrorModalInfo(data.isErrorModalInfo)
    setUserStatus(data.userStatus)
    setIsOpenPin(false)
  }


  let openPinModal = (data) => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenPinModalContent({
      action: 'convert',
      fromName: data.fromName,
      toName: data.toName,
      fromQuantity: data.fromQuantity,
      toQuantity: data.toQuantity,
    })

    return setIsOpenPin(true)
  }



  let closePinModal = (data) => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenPin(false)
    if (data === true) {
      return navigate('/home')
    } else {
      return
    }
  }





  return (
    <>
      {isErrorModal ? <Modal content={isErrorModalInfo} closeModal={resolveModal} /> : <></>}
      {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
      {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
      {isOpenPin && <AuthModal isOpenPinModalContent={isOpenPinModalContent} closePinModal={closePinModal} />}

      <div className={styles.dashboard} style={{backgroundColor:color.background}}>
        <div className={styles.sidebar}>
          <SettingSidebar status='' />
        </div>

        <div className={styles.main} >
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title={`convert ${fromcoin}`} />
          {/*actual home screen */}

          <ConvertCalculator openModal={openModal} openPinModal={openPinModal} closePinModal={closePinModal} />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div></>




  )
}

export default ExchangeCalculator