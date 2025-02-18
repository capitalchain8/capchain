import React from 'react';
import styles from './TransactionCard.module.css';
import moment from 'moment';
import { useSelector } from "react-redux";


export const TransactionCard = ({data,detailHandler}) => {
    let { color } = useSelector(state => state.userAuth)

    if(data.currencyType === 'Crypto'){
        return (<div className={styles.transaction} key={data.date}>
        <div className={styles.crypto}>
            

            <div className={styles.cryptoContent}>
                <h2 style={{color:color.importantText}}> {data.transactionType === 'Debit'?'Sent':'Recieved'} {Number(data.amount).toFixed(2)} of...</h2>
                <p style={{color:color.normalText}}>{moment(data.date).from(moment())} </p>
            </div>

        </div>
        <div>
            <button onClick={()=>{
                if(data.transactionType === 'Debit'){
                    data.action='Sent'
                    return detailHandler(data)
                }else{
                    data.action='Recieved'
                    return detailHandler(data)

                }
                
            }} style={{backgroundColor:color.fadeColor,color:color.importantText}}>
                Details
            </button>

        </div>

    </div>)

    }else {
        return (<div className={styles.transaction}>
            <div className={styles.crypto}>
                <div className={styles.cryptoContent}>
                    <h2 style={{color:color.importantText}}> {data.transactionType === 'Debit'?'Rent':'Recieved'} {Number(data.amount).toFixed(0)}...</h2>
                    <p style={{color:color.normalText}}>4 month ago  </p>
                </div>
    
            </div>
            <div>
                <button onClick={()=>{
                if(data.transactionType === 'Debit'){
                    data.action='Sent'
                    return detailHandler(data)
                }else{
                    data.action='Recieved'
                    return detailHandler(data)

                }
                
            }}  style={{backgroundColor:color.fadeColor,color:color.importantText}}>
                    Details
                </button>
    
            </div>
    
        </div>)

    }
    
}