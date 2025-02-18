import React from 'react';
import styles from './BuyEarning.module.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


let coinData = [
    {
        imgUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        name: 'Bitcoin',
        percent: 9.34
    },
    {
        imgUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850',
        name: 'BNB',
        percent: 4.14
    },
    {
        imgUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
        name: 'USD Coin',
        percent: 8.04
    },
    {
        imgUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731',
        name: 'XRP',
        percent: 9.00
    },


]




export const BuyEarning = () => {
    let { color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    const navigateHandler = ()=>{
        navigate('/assets/buy')
    }


    return (
        <div className={styles.buyearning} style={{backgroundColor:color.background}}>
            <div className={styles.heading}>
                <h2 style={{color:color.importantText}}>Buy new earning assets</h2>
                <p style={{color:color.fadeText}}>Earn by holding eligible assets or enroll with a couple of clicks</p>
            </div>

            {coinData.map(data => <div className={styles.coinCon} key={data.name}>
                <div className={styles.coinContent}>
                    <div className={styles.imgContainer}>
                        <img src={data.imgUrl} />
                    </div>

                    <div className={styles.coinSymbols}>
                        <p style={{color:color.normalText}}>{data.name}</p>
                        <p>earn {data.percent} APY</p>
                    </div>

                </div>
                <div className={styles.action}>
                    <button style={{backgroundColor:color.fadeButtonColor,color:color.importantText}} onClick={navigateHandler}>buy</button>

                </div>

            </div>)}

        </div>
    )
}
