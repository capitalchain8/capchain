import React from 'react'
import { TransactionCard } from './TransactionCard';
import styles from './TransactionHistory.module.css';
import { useSelector } from "react-redux";


export const TransactionHistory = ({ width, transactionData, selectAsset, selectCash, detailHandler }) => {
    let { color } = useSelector(state => state.userAuth)

    let selectAssetsHandler = () => {
        selectAsset()

    }

    let selectCashHandler = () => {
        selectCash()

    }

    return (<div className={styles.historyContainer} style={{ width: width ? width : '',backgroundColor:color.background }} >

        {width ? <></> : <div className={styles.headContainer} style={{backgroundColor:color.background}}>
            <h2 style={{color:color.importantText}}>Transaction history</h2>
        </div>}

        <div className={styles.transactionContainer} style={{backgroundColor:color.background}}>
            <p className={styles.transactionText} style={{color:color.normalText}}>
                Overview of cash and assets transactions for this account !
            </p>

            {transactionData.length > 0 ?<div className={styles.divisionContainer}>

                <button onClick={selectAssetsHandler} style={{ color: transactionData[0].currencyType === 'Crypto' ?color.importantText :`red`,backgroundColor:color.fadeColor }} >
                    Assets

                </button>

                <button onClick={selectCashHandler} style={{ color: transactionData[0].currencyType === 'Cash' ?'': color.fadeColor?color.importantText : color.importantText,backgroundColor:color.fadeColor }}>
                    Cash
                </button>

            </div>:<div className={styles.divisionContainer}>
                <button onClick={selectAssetsHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}} >
                    Assets

                </button>
                <button onClick={selectCashHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}}>
                    Cash
                </button>

            </div>}


            <div>
            {transactionData.length> 0?<>{transactionData.map(data => <TransactionCard
                    key={data.img} data={data} detailHandler={detailHandler} />)}</>:<div style={{flex:1,display:'flex',justifyContent:'center',justifyContent:'center',color:color.fadeColor?color.normalText:'rgb(100,100,100'}}>
                        no transaction on this account yet
                    </div>}
            
            </div>


        </div>


    </div>)
}