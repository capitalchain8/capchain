import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { TransactionHistory } from '../TransactionHistory';
import SendBox from './SendBox';
import { useNavigate } from 'react-router-dom';
import { getTransactions } from '../../../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";



export const SendComponent = ({ openTransactionModal }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [transactions, settransactions] = useState([])
    let [filteredTransactions, setFilteredtransactions] = useState([])
    let { color } = useSelector(state => state.userAuth)

    let dispatch = useDispatch()
    let navigate = useNavigate()




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



    let continueHandler = () => {
        navigate('/assets/send')
    }




    return (<>
        {isLoading && <div style={{ height: '100vh', backgroundColor: color.background }}><Loader /></div>}
        {!isLoading && <div className={styles.sendScreen} style={{ height: '89vh', backgroundColor: color.background }}>

            <div className={styles.pay}>
                <SendBox continueHandler={continueHandler} />
            </div>

            <div className={styles.rightBar}>
                <TransactionHistory transactionData={filteredTransactions} selectAsset={selectAsset} selectCash={selectCash} detailHandler={detailHandler} />

            </div>



        </div>}
    </>



    )
}