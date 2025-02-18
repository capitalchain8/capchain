import React, { useEffect,useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';



import BackHeader from '../../../component/userscreencomp/backHeader';
import { useParams } from 'react-router-dom';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import { TopUpAccount } from './../../../component/userscreencomp/Top-up/TopUp';
import SettingSidebar from './../../../component/userscreencomp/settingSideBar';
import { useSelector } from "react-redux";



const TopUpForm = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let { color } = useSelector(state => state.userAuth)


  let { action } = useParams()

  useEffect(() => {
    // alert(action)
  })

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
      {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
      {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <SettingSidebar status='' />
        </div>

        <div className={styles.main} style={{backgroundColor:color.background}}>
          <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title={`Top up`} />
          {/*actual home screen */}

          <TopUpAccount />

          {/* footer*/}

          <div className={styles.desktopFooterCont}>
            <Desktopfooter />
          </div>
        </div >
      </div >
    </>
  )
}

export default TopUpForm