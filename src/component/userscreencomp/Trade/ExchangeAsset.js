import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Home.module.css';
import { Coinlist } from './CoinList';
import { loadCoins } from '../../../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
//import Loader from './Loader';
import { Error } from '../Error';
import { data } from '../../../data/data';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";



export const ExchangeAsset = ({buy,address}) => {

    let [coins, setCoins] = useState(data)
    let [filteredCoins, setFilteredCoins] = useState(data)
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)


    let dispatch = useDispatch()
    let navigate = useNavigate()
    let {fromcoin,fromcoinsymbol,fromcoinprice} = useParams()
    let { color } = useSelector(state => state.userAuth)

    


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
    }


    let loadData = useCallback(async () => {
        /*
        let res = await dispatch(loadCoins(1, 100))
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            console.log(res.message)
            return
        }
        console.log(res.message)
        setCoins((existingCoins) => [...existingCoins, ...res.message]);
        setFilteredCoins((existingCoins) => [...res.message]);
        setIsError(false)
        setIsLoading(false)
        */
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
        /*navigate(`/coin/${coin.id}/${coin.market_cap}/${coin.market_cap_rank}/${coin.price_change_percentage_24h}/${coin.total_volume}`)*/
        //navigate(`/${action}/${coin.id}/${coin.current_price}`)
        //navigate to exchange calculator


        navigate(`/calculateexchange/${fromcoin}/${fromcoinsymbol}/${fromcoinprice}/${coin.id}/${coin.symbol}/${coin.current_price}`)

    }



    return (
        <>{isError ? <Error tryAgain={tryAgain} /> : <div className={styles.availableAssetScreen} style={{backgroundColor:color.background}}>
            <div className={styles.timeline} style={{backgroundColor:color.background}}>

                {!isLoading && !isError && <Coinlist filteredCoins={filteredCoins} searchHandler={searchHandler} selectHandler={selectHandler} navigateHandler={navigateHandler} buy={buy} address={address} />}
                
            </div>
        </div>}
        </>


    )
}
