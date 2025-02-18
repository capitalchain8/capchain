import React, { useState } from 'react';
import styles from './Home.module.css';
import Desktopfooter from '../../../component/userscreencomp/desktopfooter';
import Sidebar from '../../../component/userscreencomp/sidebar';
import Chart from '../../../component/userscreencomp/Chart/Chart';
import BackHeader from '../../../component/userscreencomp/backHeader';
import TransferModal from '../../../component/Modal/transferModal';
import TradeModal from './../../../component/Modal/tradeModal';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";




const TradeChart = () => {
  //tradeModal and transfer modal
  let [isOpenTradeModal, setIsOpenTradeModal] = useState(false)
  let [isOpenTransferModal, setIsOpenTransferModal] = useState(false)
  let { color } = useSelector(state => state.userAuth)

  let {name} = useParams()


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



  return (<>
    {isOpenTransferModal && <TransferModal closeModal={closeModal} />}
    {isOpenTradeModal && <TradeModal closeModal={closeModal} />}
    <div className={styles.dashboard} style={{backgroundColor:color.background}}>

      <div className={styles.sidebar} >
        <Sidebar status='Trade' />
      </div>

      <div className={styles.main} >
        <BackHeader openTradeModal={openTradeModal} openTransferModal={openTransferModal} title={`${name}`} />
        {/*actual home screen */}

        <Chart />
        {/* footer*/}

        <div className={styles.desktopFooterCont}>
          <Desktopfooter />
        </div>
      </div >

    </div >

  </>


  )
}

export default TradeChart