import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Home.module.css';
import { Coinlist } from './CoinList';
import { loadCoins } from '../../../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import {Loader} from '../HomeLoader';
import { Error } from '../Error';
import { Transaction } from './Transaction';
import { Verification } from './Verification';
import { useNavigate } from 'react-router-dom';




export const Trade = ({ buy }) => {
    //all ajax request should be don here
    let [coins, setCoins] = useState([])
    let [filteredCoins, setFilteredCoins] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { user, assetList,color } = useSelector(state => state.userAuth)


    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = coins.filter((item) => {
                const itemData = item.id ? item.id.toUpperCase() : ''.toUpperCase();
                const textData = e.target.value.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredCoins(newData)
            setIsLoading(false)

        } else {
            setFilteredCoins(coins)
            setIsLoading(false)

        }
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

    let loadData = useCallback(async () => {
        setCoins(assetList);
        setFilteredCoins(assetList);
        setIsError(false)
        setIsLoading(false)
    }, [loadCoins])



    useEffect(() => {
        loadData()
    }, [loadData])

    let tryAgain = () => {
        setIsLoading(false)
        setIsLoading(true)
        loadData()
    }

    let navigateHandler = (coin) => {
        navigate(`/coin/${coin.id}/${coin.market_cap}/${coin.market_cap_rank}/${coin.price_change_percentage_24h}/${coin.total_volume}/${coin.current_price}`)

    }
    if (isLoading) {
        return <Loader />
    }





    return (
        <>{isError ? <Error tryAgain={tryAgain} /> : <div className={styles.tradeScreen}>
            <div className={styles.timeline} style={{backgroundColor:color.background}}>

                {!isLoading && !isError && <Coinlist filteredCoins={filteredCoins} searchHandler={searchHandler} selectHandler={selectHandler} navigateHandler={navigateHandler} buy={buy} />}
                {isLoading && <Loader />}
            </div>

            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
                {user.status?<></>:<Verification />}
                <Transaction />
            </div>

        </div>}</>


    )
}