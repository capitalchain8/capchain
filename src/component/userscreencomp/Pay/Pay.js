import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../HomeLoader';
import { PayBox } from './Paybox';
import { TransactionHistory } from '../TransactionHistory';
import { getTransactions } from '../../../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
import { Error } from "../Error";
import { useSelector } from "react-redux";



export const Pay = ({ openTransactionModal }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [transactions, settransactions] = useState([])
    let [filteredTransactions,setFilteredtransactions] = useState([])
    let { color } = useSelector(state => state.userAuth)

    let dispatch = useDispatch()



    useEffect(() => {
        fetchtransaction()
    }, [])


    let fetchtransaction = async () => {
        setIsLoading(true)
        let res = await dispatch(getTransactions())
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            return
        }
       
        settransactions(res.message)
        setFilteredtransactions(res.message)
        setIsLoading(false)

    }

    let selectCash = () => {
        let arr = transactions.filter(data => data.currencyType === 'Cash')
        setFilteredtransactions([...arr])
    }

    let selectAsset = () => {
        let arr = transactions.filter(data => data.currencyType === 'Crypto')
        setFilteredtransactions([...arr])
    }

    let detailHandler = (data) => {
        openTransactionModal(data)
    }

     if(isError){
        return <Error/>
    }



    return (<>
        {isLoading && <Loader />}
        {!isLoading && <div className={styles.payScreen} style={{backgroundColor:color.background}}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <PayBox />
            </div>

            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
                <TransactionHistory  transactionData={filteredTransactions} selectAsset={selectAsset} selectCash={selectCash} detailHandler={detailHandler} />
            </div>

        </div>}
    </>



    )
}