import React from 'react';
import styles from './CoinChart.module.css';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import { About } from './About';
import { MarketStat } from './MarketStat';
import { useSelector } from "react-redux";



const filterDaysArray = [
    { filterDay: "1", filterText: "24h" },
    { filterDay: "7", filterText: "7d" },
    { filterDay: "30", filterText: "30d" },
    { filterDay: "365", filterText: "1y" },
    { filterDay: "max", filterText: "All" },
];



export const CoinChart = ({ changeSelectedDay, filterText, data, market_cap, market_cap_rank, percentage, total_volume, coin,addAssetToWatchList,price,handleNavigateHandler }) => {


    let changeSelectedHndler = (data) => {
        //call external function
        changeSelectedDay(data)
    }

    let colors = percentage > 0?'green':'red'

    let { user,color } = useSelector(state => state.userAuth)
    console.log(coin)

    let isWatchlisted = user.watchList.filter(data=>data === coin.id)

    




    return (
        <div className={styles.coinChartCon} style={{backgroundColor:color.background}}>

            <div className={styles.priceContainer}>
                <div className={styles.price}>
                    <h1 style={{color:color.importantText}}>${price}</h1>
                </div>

                <div className={styles.watchListCon}>
                    <span className="material-icons" onClick={addAssetToWatchList} style={{color:isWatchlisted.length>0?'#1652f0':color.importantText,backgroundColor:color.fadeColor}}>
                        star
                    </span>
                    <span className="material-icons" style={{color:color.importantText,backgroundColor:color.fadeColor}}>
                        share
                    </span>

                </div>

            </div>

            <div className={styles.trendingPrice}>
                <h1 style={{color:colors}}> <span className='material-icons'>{percentage < 0?'call_received':'call_made'}</span> 0.91%</h1>

            </div>

            <VictoryChart >
                <VictoryLine data={data?.prices.map(([timestamp, value]) => ({ y: timestamp, x: value }))}
                    interpolation='natural' style={{
                        data: {
                            stroke: colors,
                            strokeWidth: 3
                        }
                    }}>

                </VictoryLine>

                <VictoryAxis style={{
                    axis: { stroke: 'none' },
                    tickLabels: { fill: 'transparent' },
                    data: { stroke: 'red' },

                }} />
            </VictoryChart>

            <div className={styles.filterComponent}>

                {filterDaysArray.map(data => <p key={data.filterText} onClick={() => changeSelectedHndler(data.filterDay)} style={{ backgroundColor: filterText === data.filterDay ? color.fadeColor?color.fadeColor:'rgb(245, 245, 245)' : 'transparent', color: filterText === data.filterDay ? '#1652f0' : color.fadeColor?color.importantText:'black' }} >{data.filterText}</p>)}



            </div>

            <div className={styles.mobileAbout} style={{backgroundColor:color.background}}>
                {coin ? <About coin={coin} /> : <></>}
            </div>


            <div className={styles.mobileMarketStat} style={{backgroundColor:color.background}}>
                <MarketStat market_cap={market_cap}
                    market_cap_rank={market_cap_rank}
                    percentage={percentage}
                    total_volume={total_volume} />
            </div>


            <div className={styles.buttonCon} onClick={handleNavigateHandler} style={{backgroundColor:color.background}}>
                <button>
                    buy
                </button>

            </div>









        </div>
    )
}
