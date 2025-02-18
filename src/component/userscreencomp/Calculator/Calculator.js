import React, { useState, useEffect } from 'react';
import styles from '../Home.module.css';
import { Loader } from './../Loader';
import { ConversionRate } from '../ConversionRate';
import { MainCalculator } from '../MainCalculator';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
    sellCrypto,
    getCoin,
    buyCrypto
} from "../../../store/action/userAppStorage";
import { Error } from './../Error';
import { cryptoData } from '../../../data/data';


export const Calculator = ({ openModal, openPinModal, closePinModal }) => {
    let [isLoading, setIsLoading] = useState(false)
    let [convertRate, setConvertRate] = useState(0)
    let [buttonValue, setButtonValue] = useState('')
    let [isPriceFormat, setIsPriceFormat] = useState(false)
    let [convertedResult, setConvertedResult] = useState(0)
    const [cryptoQuantity, setCryptoQuantity] = useState(0)
    const [userAsset, setUserAsset] = useState(null);
    const [coin, setCoin] = useState(null);
    const [isError, setIsError] = useState(false);


    let dispatch = useDispatch()

    let { user, color } = useSelector(state => state.userAuth)


    let navigate = useNavigate()
    //get the action to determine destination
    let { action, medium, id, symbol, price } = useParams()

    const fetchCoinData = async () => {
        setIsLoading(true)
        const coinData = cryptoData.filter(data => data.id === id)
        setCoin(coinData[0]);
        setIsLoading(false)

    };




    useEffect(() => {
        //set conversion rate
        setConvertRate(price)

        fetchCoinData()

    }, [])


    //useeffect compute if user has the coin
    useEffect(() => {
        let assets = user.personalAssets.filter(data => {
            if (data.id.toLowerCase() === id.toLowerCase()) {
                return data
            }
        })

        if (assets.length > 0) {
            setUserAsset(assets[0])
            let cryptoQuantity = assets[0].quantity
            setCryptoQuantity(cryptoQuantity)
        }

        setIsLoading(false)
    }, []);



    let buttonHandler = (num) => {
        setButtonValue(prev => {
            if (prev.length > 10) {
                calculateVal(prev)
                return prev
            }
            calculateVal(prev + num)
            return prev + num
        })

    }


    let calculateVal = (val) => {
        let res = Number(val) * convertRate
        setConvertedResult(res)
    }



    //dot fun
    let point = () => {

        setButtonValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    //deleting algorithm
    let deleteHandler = () => {
        //get the value string and remove the last element
        setButtonValue(prev => {
            calculateVal(prev.slice(0, -1))
            return prev.slice(0, -1)
        })
    }

    let continueHandler = async () => {
        //if user typed nothing
        if (!buttonValue) {
            return;
        }

        if (action === 'send') {
            let cryptoAsset = !isPriceFormat ? buttonValue : convertedResult
            //check if user does not have up to the amount
            if (cryptoQuantity < cryptoAsset) {
                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: `you only have ${cryptoQuantity} of this asset available. Buy more assets to complete transaction`,
                    userStatus: 'sendAsset'
                }
                return openModal(data)
            }

            //else proceed to send
            let cryptoPrice = isPriceFormat ? buttonValue : convertedResult
            let cryptoAmount = !isPriceFormat ? buttonValue : convertedResult

            //else check if pin is required
            if (user.isRequiredPin) {
                let data = {
                    action: 'send',
                    medium: medium,
                    id: id,
                    cryptoAmount: cryptoAmount,
                    cryptoPrice: cryptoPrice,
                }
                return openPinModal(data)
            }


            navigate(`/recipient/${medium === 'bank' ? 'bankcredential' : 'walletaddress'}/${id}/${cryptoAmount}/${cryptoPrice}`)

            return




        } else if (action === 'buy') {
            //check if user has the amount to purchase that
            let crypto_price = isPriceFormat ? buttonValue : convertedResult

            let crypto_amount = !isPriceFormat ? buttonValue : convertedResult

            let price = crypto_price


            if (!user.isPayVerified) {
                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: `Please add a payment method for further verification`,
                    userStatus: 'payment'
                }
                return openModal(data)
            }
            //if user has no identity
            if (!user.isFrontIdVerified || !user.isBackIdVerified) {
                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: "please you need to verify your identity before you can start trading on crypto assets",
                    userStatus: 'id'
                }
                return openModal(data)

            }
            //check for trading status

            if (!user.status) {
                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: "Account has not been verified.it will take a period of 24 hours.contact support if it exceeds!",
                    userStatus: 'status'
                }
                return openModal(data)

            }
            
            if (Number(user.accountBalance) < crypto_price) {

                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: `you only have ${user.accountBalance} balance available. Top up cash to purchase ${crypto_amount} amount of ${id}`,
                    userStatus: 'buyAsset'
                }
                return openModal(data)

            }
            //else check if pin is required
            if (user.isRequiredPin) {
                let data = {
                    action: 'buy',
                    quantity: Number(crypto_amount),
                    name: id,
                    decrement: Number(crypto_price)
                }
                return openPinModal(data)
            }

            //this is where purchase will now occur
            setIsLoading(true)

            let data = {
                quantity: Number(crypto_amount),
                name: id,
                decrement: Number(crypto_price)
            }

            let res = await dispatch(buyCrypto(data))

            if (!res.bool) {
                setIsLoading(false)
                closePinModal(res.bool)
                return
            }


            setIsLoading(false)
            closePinModal(res.bool)
            return



        } else if (action === 'sell') {
            //check if user has up to the quantity of coin to sell
            let cryptoAsset = !isPriceFormat ? buttonValue : convertedResult
            let price = isPriceFormat ? buttonValue : convertedResult


            //check if user does not have up to the amount
            if (cryptoQuantity < cryptoAsset) {
                let data = {
                    isErrorModal: true,
                    isErrorModalInfo: `you only have ${cryptoQuantity} of this asset available. Buy more assets to complete transaction`,
                    userStatus: 'sellAsset'
                }
                return openModal(data)
            }

            //else check if pin is required
            if (user.isRequiredPin) {
                let data = {
                    action: 'sell',
                    price: Number(price),
                    name: id,
                    quantity: Number(cryptoAsset),
                }
                return openPinModal(data)
            }

            //what ill pass to the server
            setIsLoading(true)
            let res = await dispatch(sellCrypto({
                price: Number(price),
                name: id,
                quantity: Number(cryptoAsset),
            }))

            if (!res.bool) {
                setIsLoading(false)
                closePinModal(res.bool)
                return

            }
            setIsLoading(false)
            closePinModal(res.bool)
            return







        }
    }



    let swapHandler = () => {
        //then swap handler
        let newRate
        if (isPriceFormat === false) {
            newRate = 1 / price
        } else {
            newRate = price
        }
        setIsPriceFormat(prev => !prev)
        setConvertRate(newRate)
        setConvertedResult(0)
        setButtonValue('')
    }

    if (isError) {
        return <Error />
    }



    return (<>

        {isLoading && <Loader />}
        {!isLoading && <div className={styles.calculatorScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.pay} style={{ backgroundColor: color.background }}>
                <MainCalculator
                    buttonClick={buttonHandler}
                    deleteHandler={deleteHandler}
                    continueHandler={continueHandler}
                    swapHandler={swapHandler}
                    point={point}
                    id={id}
                    symbol={symbol}
                    buttonValue={buttonValue}
                    result={Number(convertedResult).toFixed(4)}
                    priceFormat={isPriceFormat}
                    balance={Number(cryptoQuantity).toFixed(3)}
                    userasset={userAsset}
                    imgUrl={coin ? coin.image : ''}
                />
            </div>


            <div className={styles.rightBar} style={{ backgroundColor: color.background }}>
                <ConversionRate
                    buttonClick={buttonHandler}
                    deleteHandler={deleteHandler}
                    continueHandler={continueHandler}
                    point={point} />
            </div>

        </div>}
    </>



    )
}
