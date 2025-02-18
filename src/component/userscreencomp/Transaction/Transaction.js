import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { getTransactions } from '../../../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
import { Error } from './../Error';
import { Loader } from './../Loader';
import { TransactionBox } from './TransactionBox';
import { useSelector } from "react-redux";



export const TransactionCom = ({openTransactionModal}) => {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [transactions, settransactions] = useState([])
    let [filteredTransactions,setFilteredtransactions] = useState([])
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)

    

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

    let detailHandler =(data)=>{
        openTransactionModal(data)
    }


    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        return <Error />
    }


    return (<>
        {!isLoading && <div className={styles.notificationScreen} style={{ height: '89vh',backgroundColor:color.background }} >
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <TransactionBox transactions={filteredTransactions} selectCash={selectCash} selectAsset={selectAsset} detailHandler={detailHandler}/>
            </div>
        </div>}
    </>
    )
}