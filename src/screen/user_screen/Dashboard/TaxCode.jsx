import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import { TaxCom } from './../../../component/userscreencomp/Code/TaxCom';
import Modal from './../../../component/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import SettingSidebar from './../../../component/userscreencomp/settingSideBar';
import { useSelector } from "react-redux";




const Taxcode = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let [isOpenModal, setIsOpenModal] = useState(false)
  let [isOpenModalContent, setIsOpenModalContent] = useState(false)
  let [isUrl, setIsUrl] = useState(false)
  let navigate = useNavigate()
  let { color } = useSelector(state => state.userAuth)

  //for transfer and trade modal
  let openTradeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
    setIsOpenModal(false)
  }



  let openTransferModal = () => {
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)
    setIsOpenModal(false)

  }

  let closeModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenModal(false)

  }

  let openModal = (data,bool) => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenModalContent(data)
    setIsUrl(bool)
    setIsOpenModal(true)

  }

  let resolveOpenModal = () => {
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
    setIsOpenModal(false)

    if(isUrl){
      return navigate('/ust')
    }else{
      return
    }

  }



  return (
    <>
      {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
      {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
      {isOpenModal && <Modal closeModal={resolveOpenModal} content={isOpenModalContent} />}

      <div className={styles.dashboard} style={{backgroundColor:color.background}}>
        <div className={styles.sidebar}>
          <SettingSidebar status='' />
        </div>

        <div className={styles.main} >
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title='Transaction ' />
          {/*actual home screen */}

          <TaxCom openModal={openModal} />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >

      </div ></>




  )
}

export default Taxcode