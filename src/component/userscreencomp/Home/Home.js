import React, { useEffect, useCallback, useState } from 'react';
import styles from '../Home.module.css';
import { Timeline } from './Timeline';
import TopMovers from './TopMovers';
import { Balance } from './Balance';
import { WatchList } from './WatchList';
import { useDispatch } from "react-redux";
import { loadCoins } from "../../../store/action/userAppStorage";
import { Loader } from '../HomeLoader';
import {  timelineData } from '../../../data/data';
import { useNavigate } from 'react-router-dom';
import { Error } from "../Error";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'



export const HomeComponent = ({ buy }) => {
  let [coins, setCoins] = useState([])
  let [filteredCoins, setFilteredCoins] = useState([])
  let [isLoading, setIsLoading] = useState(false)
  let [isError, setIsError] = useState(false)
  //initialising reduzx
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { user, assetList,color } = useSelector(state => state.userAuth)


  
  
  useEffect(() => {
    loadingCoins()
  }, [])


  let loadingCoins = useCallback(async () => {
    if (isLoading || filteredCoins.length > 0) {
      return
    }
    setIsLoading(true)
    if (assetList.length > 0) {
      setCoins(assetList)
      setFilteredCoins(assetList)
      setIsLoading(false)
      setIsError(false)
      return

    }
    let res = await dispatch(loadCoins(1, 300))
    if (!res.bool) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    setCoins(res.message)
    setFilteredCoins(res.message)
    setIsLoading(false)
    setIsError(false)

  }, [])


  let navigateHandler = (coin) => {
    navigate(`/coin/${coin.id}/${coin.market_cap}/${coin.market_cap_rank}/${coin.price_change_percentage_24h}/${coin.total_volume}/${coin.current_price}`)

  }

  let selectHandler = (e) => {
    let selectedVal = e.target.value

    if (selectedVal === 'All assets') {
      setFilteredCoins(coins)
    } else {
      let filteredArray = []

      for (let coin of filteredCoins) {
        for (let listItem of user.watchList) {
          if (coin.id === listItem) {
            filteredArray.push(coin)
          }

        }

      }
      setFilteredCoins([...filteredArray])

    }
  }





  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error />
  }


  return (<div className={styles.homeScreen} style={{backgroundColor:color.background}}>
   

    <div className={styles.timeline} style={{backgroundColor:color.background}}>

      <Balance user={user} />

      <WatchList data={filteredCoins.slice(0,10)} navigateHandler={navigateHandler} buy={buy} selectHandler={selectHandler} />

      <Timeline timeline={timelineData} />
    </div>

    <div className={styles.rightBar} style={{backgroundColor:color.background}}>
      {/*<News />*/}
      <TopMovers coins={coins.slice(0,8)} />
    </div>

  </div>)




}
