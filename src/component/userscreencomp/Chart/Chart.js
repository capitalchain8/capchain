import React, { useState, useEffect, useCallback } from 'react';
import styles from '../Home.module.css';
import { useDispatch } from "react-redux";
import {
  getDetailedCoinData,
  getCoinMarketChart,
  addToWatchList
} from "../../../store/action/userAppStorage";
import { useParams, useNavigate } from 'react-router-dom';
import { CoinChart } from './CoinChart';
import { About } from './About';
import { MarketStat } from './MarketStat';
import { Loader } from '../Loader';
import Modal from '../../Modal/Modal';
import millify from 'millify'
import { Error } from '../Error';
import { useSelector} from "react-redux";



const Chart = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataError, setIsDataError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isErrorModalInfo, setIsErrorModalInfo] = useState(false);
  const [userStatus, setUserStatus] = useState('');
  let [filterText, setFilterText] = useState('1')
  let { user,color } = useSelector(state => state.userAuth)
  const navigate = useNavigate()
  let dispatch = useDispatch()


  //destructuring data from navigation
  const {
    name: coinId,
    market_cap,
    market_cap_rank,
    percentage,
    total_volume,
    price
  } = useParams();







  const fetchMarketCoinData = async (selectedRangeValue) => {
    setIsLoading(true)
    const fetchedCoinMarketData = await dispatch(getCoinMarketChart(
      coinId,
      selectedRangeValue
    ));
    if (!fetchedCoinMarketData.bool) {
      //throw error screen
      setIsDataError(true)
      setIsLoading(false)
      return
    }
    setCoinMarketData(fetchedCoinMarketData.message);
    setIsLoading(false)
  };

  const fetchCoinData = async () => {
    setIsLoading(true)
    const fetchedCoinData = await dispatch(getDetailedCoinData(coinId));
    if (!fetchedCoinData.bool) {
      //throw error screen
      console.log(fetchedCoinData)
      setIsError(true)
      setIsLoading(false)
      return
    }
    setCoin(fetchedCoinData.message)
    setIsLoading(false)

  };

  const changeSelectedDay = (data) => {
    setFilterText(data)
    fetchMarketCoinData(data);
  }


  useEffect(() => {
    fetchCoinData().then(data => {
      fetchMarketCoinData(1);
    }
    )


  }, []);


  const addAssetToWatchList = async () => {
    setIsLoading(true)
    let res = await dispatch(addToWatchList({ id: coinId, user: user }))
    if (!res.bool) {
      setIsErrorModal(true)
      setIsErrorModalInfo('could not add to watchlist.try later')
      setIsLoading(false)
      return
    }
    setIsLoading(false)
  }


  let tryAgain = useCallback(() => {
    fetchMarketCoinData(1);
    fetchCoinData();
  })


  let closeModal = () => {
    if (!userStatus) {
      setIsErrorModal(false)
      setIsErrorModalInfo('')
      return
    } else if (userStatus == 'pay') {
      //navigate to page to add payment credentials
      navigate(`/add-card/${user.email}`)

    } else if (userStatus == 'id') {
      //navigate to add identity page
      navigate(`/idverification`)
    }


  }

  let handleNavigateHandler = () => {

    if (!user.isPayVerified) {
      setUserStatus('pay')
      setIsErrorModal(true)
      setIsErrorModalInfo("You need to activate your account to start trading")
      return
    }

    if (!user.isFrontIdVerified || !user.isBackIdVerified) {
      setUserStatus('id')
      setIsErrorModal(true)

      setIsErrorModalInfo("please you need to verify your identity before you can start trading on crypto assets")
      return
    }
    //navigate to calculator screen
    navigate(`/calculate/buy/${coin.id}/${coin.symbol}/${price}/bank`)




  }


  if (isError || isDataError) {
    return <Error tryAgain={tryAgain} />
  }








  return (
    <>
      {isErrorModal ? <Modal content={isErrorModalInfo} closeModal={closeModal} /> : <></>}
      
      {!isLoading ? <div className={styles.chartScreen} style={{backgroundColor:color.background}}>

        <div className={styles.timeline}>
          <CoinChart filterText={filterText}
            changeSelectedDay={changeSelectedDay}
            data={coinMarketData}
            market_cap={millify(market_cap)}
            market_cap_rank={market_cap_rank}
            percentage={percentage}
            total_volume={millify(total_volume)}
            coin={coin}
            addAssetToWatchList={addAssetToWatchList}
            price={price}
            handleNavigateHandler={handleNavigateHandler}
          />
        </div>



        <div className={styles.rightBar}>

          {coin ? <About coin={coin} /> : <></>}

          <MarketStat market_cap={millify(market_cap)}
            market_cap_rank={market_cap_rank}
            percentage={percentage}
            total_volume={millify(total_volume)}
          />


        </div>

      </div> : <Loader />}
    </>
  )
}

export default Chart