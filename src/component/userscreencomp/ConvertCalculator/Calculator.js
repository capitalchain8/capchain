import React, { useState, useEffect } from 'react';
import styles from '../Home.module.css';
import { Loader } from './../Loader';
import { ConversionRate } from '../ConversionRate';
import { MainCalculator } from './MainCalculator';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { convertCrypto } from './../../../store/action/userAppStorage';



export const ConvertCalculator = ({ openModal, openPinModal, closePinModal }) => {

    let [isLoading, setIsLoading] = useState(false)
    let [convertRate, setConvertRate] = useState(23000)
    let [buttonValue, setButtonValue] = useState('')
    let [convertedResult, setConvertedResult] = useState(0)
    const [cryptoQuantity, setCryptoQuantity] = useState(0)
    const [userAsset, setUserAsset] = useState(null);
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { user,color } = useSelector(state => state.userAuth)


    //get the action to determine destination
    let { fromcoin, fromcoinprice, tocoin, tocoinprice, fromcoinsymbol, tocoinsymbol } = useParams()


    useEffect(() => {
        //set conversion rate
        let rate = tocoinprice / fromcoinprice
        setConvertRate(rate)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])





    //useeffect compute if user has the coin
    useEffect(() => {
        let assets = user.personalAssets.filter(data => {
            if (data.id.toLowerCase() === fromcoin.toLowerCase()) {
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
        //check if user does not have up to the amount
        if (cryptoQuantity < Number(buttonValue)) {
            let data = {
                isErrorModal: true,
                isErrorModalInfo: `you only have ${Number(cryptoQuantity).toFixed(3)} of this asset available. Buy more assets to complete transaction`,
            }
            return openModal(data)
        }

        if (user.isRequiredPin) {
            let data = {
                action: 'convert',
                fromName: fromcoin,
                toName: tocoin,
                fromQuantity: buttonValue,
                toQuantity: convertedResult,
            }
            return openPinModal(data)
        }

        //what ill pass to the server
        setIsLoading(true)
        let res = await dispatch(convertCrypto({
            fromName: fromcoin,
            toName: tocoin,
            fromQuantity: buttonValue,
            toQuantity: convertedResult,
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

    let swapHandler = () => {
        //do nothing
    }


    return (<>
        {isLoading && <Loader />}
        {!isLoading && <div className={styles.calculatorScreen} style={{backgroundColor:color.background}}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <MainCalculator
                    swapHandler={swapHandler}
                    buttonValue={buttonValue}
                    result={convertedResult}
                    from={fromcoinsymbol}
                    to={tocoinsymbol}
                    id={fromcoin}
                    buttonClick={buttonHandler}
                    deleteHandler={deleteHandler}
                    continueHandler={continueHandler}
                    point={point}
                    balance={Number(cryptoQuantity).toFixed(3)}
                    userasset={userAsset}
                />
            </div>


            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
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
