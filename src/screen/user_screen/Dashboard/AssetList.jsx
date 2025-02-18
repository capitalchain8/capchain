import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Sidebar from '../../../component/userscreencomp/sidebar';
import BackHeader from '../../../component/userscreencomp/backHeader';
import { Assets } from '../../../component/userscreencomp/Trade/AssetsList';
import { useParams } from 'react-router-dom';
import BuyModal from '../../../component/Modal/buyModal';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import { useSelector } from "react-redux";



const AssetList = () => {
  let [isInfo, setIsInfo] = useState(false)
  let [isInfoObj, setIsInfoObj] = useState(null)
  let { color } = useSelector(state => state.userAuth)

  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)


  

  let { action } = useParams()

  

  let displayModal = (bool, coin, action) => {
    setIsInfo(bool)
    setIsInfoObj({
      coin: coin,
      action: action
    })
  }

  //for transfer and trade modal
  let openTradeModal = () => {
    setIsInfo(false)
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(true)
  }



  let openTransferModal = () => {
    setIsInfo(false)
    setIsOpenTransferModal(true)
    setIsOpenTradeModal(false)
  }



  let closeModal = () => {
    setIsInfo(false)
    setIsOpenTransferModal(false)
    setIsOpenTradeModal(false)
  }






  return (<>
    {isInfo && <BuyModal content={isInfoObj} />}
    {isOpenTransferModal && <TransferModal closeModal={closeModal}/>}
    {isOpenTradeModal && <TradeModal closeModal={closeModal}/>}

    <div className={styles.dashboard} style={{backgroundColor:color.background}}>

      <div className={styles.sidebar}>
        <Sidebar status='Trade' />
      </div>

      <div className={styles.main} >
        <BackHeader title={`${action} assets`} openTradeModal={openTradeModal} openTransferModal={openTransferModal}/>
        {/*actual home screen */}

        <Assets buy={false} displayModal={displayModal} address={action === 'select' ? true : false} />


        {/* footer*/}
        <div className={styles.desktopFooterCont}>
          <Desktopfooter />
        </div>
      </div >

    </div >
  </>
  )
}

export default AssetList