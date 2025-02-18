import React, { useEffect, useState, useCallback } from 'react';
import styles from '../Home.module.css';
import { Coinlist } from './CoinList';
import { changeWalletAsset } from '../../../store/action/userAppStorage';
import { useDispatch,useSelector } from 'react-redux';
//import Loader from './Loader';
import { Error } from '../Error';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Loader } from './../Loader';


export const Assets = ({ buy, displayModal, address }) => {

    let [coins, setCoins] = useState([])
    let [filteredCoins, setFilteredCoins] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let { user,assetList,color } = useSelector(state => state.userAuth)

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { action } = useParams()




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
       
        setIsLoading(true)
        if (action === 'buy' || action === 'select') {
            setCoins(assetList);
            setFilteredCoins(assetList);
            setIsError(false)
            setIsLoading(false)
            return

        } else {
            let assets = user.personalAssets.map(data => {
                return data.id.toLowerCase()
            })

            if (assets.length == 0) {
                setCoins([]);
                setFilteredCoins([]);
                setIsLoading(false)
                return
            }
            
          

            
            //filtering message response
            let arr = []

            for (let mem of assetList) {
                for (let val of user.personalAssets) {
                    if (mem.id.toLowerCase() == val.id.toLowerCase()) {
                        /*let new_coin = {...mem}
                        new_coin.price =  val.quantity * mem.current_price
                        new_coin.current_price = val.quantity * mem.current_price*/
                        arr.push(mem)
                    }
                }
            }
            setCoins(arr);
            setFilteredCoins(arr);
            setIsLoading(false)

        }
    }, [])







    useEffect(() => {
        loadData()
    }, [])





    let tryAgain = () => {
        setIsLoading(false)
        setIsLoading(true)
        setIsError(false)
        loadData()
    }

    let navigateHandler = async (coin) => {

        if (action === 'send') {
            displayModal(true, coin, action)

        } else if (action === 'convert') {
            navigate(`/exchange/${coin.id}/${coin.symbol}/${coin.current_price}`)
        } else if (action === 'buy') {

            //calculator
            navigate(`/calculate/buy/${coin.id}/${coin.symbol}/${coin.current_price}/bank`)
        } else if (action === 'sell') {

            //calculator
            navigate(`/calculate/sell/${coin.id}/${coin.symbol}/${coin.current_price}/bank`)

        } else if (action === 'select') {
            setIsLoading(true)
            // api to choose new wallet
            let data = {
                symbol: coin.symbol,
                user: user,
                id: coin.id,
                url: coin.image
            }

            let res = await dispatch(changeWalletAsset(data))
            if (!res.bool) {
                setIsLoading(false)
                setIsError(true)
                return
            }
            setIsLoading(false)
            return
        }
    }

    if (isLoading) {
        return <Loader />
    }



    return (
        <>
            {isError ? <Error tryAgain={tryAgain} /> : <div className={styles.availableAssetScreen} style={{backgroundColor:color.background}}>
                <div className={styles.timeline} style={{backgroundColor:color.background}}>

                    {!isLoading && !isError && <Coinlist filteredCoins={filteredCoins} searchHandler={searchHandler} selectHandler={selectHandler} navigateHandler={navigateHandler} buy={buy} address={address} />}

                </div>
            </div>}
        </>


    )
}