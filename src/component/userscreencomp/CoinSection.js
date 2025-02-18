import React from 'react';
import styles from './CoinSection.module.css';
import millify from 'millify';
import { truncate } from '../../utils/functions';
import { useSelector } from "react-redux";

export const CoinSection = ({ coin, navigateHandler, buy, address }) => {
    let { user,color } = useSelector(state => state.userAuth)
   


    let colors = coin.price_change_percentage_24h < 0 ? 'red' : 'green'

    let colorIcon = coin.price_change_percentage_24h > 0 ? 'call_made' : 'call_received'

    let isWatchlisted = user.watchList.filter(data=>{
        if(data === coin.id){
            return data
        }
    })



    return (<ul className={styles.bodylistCon} onClick={() => navigateHandler(coin)} style={{backgroundColor:color.background,borderBottom:`1px solid ${color.background}`}}>
        <li className={styles.listName}>
            <div className={styles.cryptoImg}>
                <img src={`${coin.image}`} />
            </div>

            <div className={styles.cryptoNameCon}>
                <p className={styles.cryptoName} style={{color:color.importantText}}>{truncate(coin.name, 7)}</p>
                <p className={styles.cryptoSymbol} style={{color:color.normalText}}>{truncate(coin.symbol, 5)}</p>
            </div>

        </li>


        {address ? <></> : <li className={styles.listPrice}>
            <p className={styles.price} style={{color:color.importantText,marginLeft:'10px'}}>${coin.current_price.toFixed(2)}</p>
            <p style={{ color: colors }} className={styles.percent} > <span className='material-icons' style={{ fontSize: '1.1rem' }}>{colorIcon}</span>{Math.abs(coin.price_change_percentage_24h)?.toFixed(3)}%</p>
        </li>}

        <li className={styles.listChange}>
            <p style={{ color: colors }}><span className='material-icons' style={{ fontSize: '1.1rem' }}>{colorIcon}</span>{Math.abs(coin.price_change_percentage_24h)?.toFixed(3)}%</p>
        </li>


        <li className={styles.listMarket}><p>{millify(coin.market_cap)}</p></li>

        {buy ? <><li className={styles.listBuy}>
            {coin.price_change_percentage_24h > 0 && <button>Buy</button>}

        </li>


            <li className={styles.listWatch}>
                <span className='material-icons' style={{color:isWatchlisted.length === 0?'':'#1652f0'}}>
                    star
                </span>
            </li></> : <></>}

        {address ? <li className={styles.address}>
            <div className={styles.cryptoNameCon}>
                <p className={styles.cryptoName} style={{color:color.importantText}}>$0.00</p>
                <p className={styles.cryptoSymbol}>{truncate(coin.symbol, 3)}</p>
            </div>
            {user.currentWallet.id.toLowerCase() === coin.id.toLowerCase() &&<div className={styles.iconNameCon}>
                <span className='material-icons'>done</span>
            </div>}
        </li> : <></>}




    </ul>)
}