import React, { useState} from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import { Calculator } from '../../../component/userscreencomp/Calculator/Calculator';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import Modal from './../../../component/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import AuthModal from './../../../component/Modal/AuthModal';
import SettingSidebar from './../../../component/userscreencomp/settingSideBar';
import { useSelector } from "react-redux";


const CryptoCalculator = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isErrorModalInfo, setIsErrorModalInfo] = useState(false);
  const [userStatus, setUserStatus] = useState("")
  const [isOpenPin, setIsOpenPin] = useState()
  const [isOpenPinModalContent, setIsOpenPinModalContent] = useState(null)
  let { user,color } = useSelector(state => state.userAuth)

  let navigate = useNavigate()
  
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
    if (userStatus == 'sendAsset') {
      setIsErrorModal(false)
      setIsErrorModalInfo(``)
      setUserStatus('')
      navigate('/trade')

    } else if (userStatus == 'buyAsset') {
      setIsErrorModal(false)
      setIsErrorModalInfo(``)
      setUserStatus('')
      navigate('/top-up')


    } else if (userStatus == 'sellAsset') {
      //alert('selling')


    }
    else if (userStatus == 'payment'){

      navigate('/paymentinformation')

    }else if (userStatus == 'status'){

      navigate('/home')
      
    }else if (userStatus == 'id'){
      navigate('/idverification')
      
    }
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

    if (data.action === 'send') {
      setIsOpenPinModalContent({
        action: 'send',
        medium: data.medium,
        id: data.id,
        cryptoAmount: data.cryptoAmount,
        cryptoPrice: data.cryptoPrice
      })
      return setIsOpenPin(true)
    } else if (data.action === 'buy') {
      console.log(data)
      setIsOpenPinModalContent({
        action: 'buy',
        quantity: data.quantity,
        name: data.name,
        decrement: data.decrement
      })
      return setIsOpenPin(true)

    } else if (data.action === 'sell') {
      setIsOpenPinModalContent({
        action: 'sell',
        price: data.price,
        name: data.name,
        quantity: data.quantity,
      })
      return setIsOpenPin(true)
    }

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



  return (<>
    {isErrorModal ? <Modal content={isErrorModalInfo} closeModal={resolveModal} /> : <></>}
    {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
    {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
    {isOpenPin && <AuthModal isOpenPinModalContent={isOpenPinModalContent} closePinModal={closePinModal} />}

    <div className={styles.dashboard}  style={{backgroundColor:color.background}}>
      <div className={styles.sidebar}>
        <SettingSidebar status='' />
      </div>

      <div className={styles.main} >
        <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title={`Enter amount`} />

        {/*actual home screen */}

        <Calculator openModal={openModal} openPinModal={openPinModal} closePinModal={closePinModal} />

        {/* footer*/}

        <div className={styles.desktopFooterCont}>
          <Desktopfooter />
        </div>
      </div >

    </div ></>



  )
}

export default CryptoCalculator