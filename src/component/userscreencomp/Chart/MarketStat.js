import React from 'react';
import styles from './About.module.css';
import { useSelector } from "react-redux";



export const MarketStat = ({market_cap,market_cap_rank,percentage,
  total_volume,name}) => {
    let { color } = useSelector(state => state.userAuth)

  return (
    <div className={styles.marketStats} style={{backgroundColor:color.background}}>

          <h1 style={{c:color.importantText}}>Market stats</h1>

          {
          [{title:'Market cap',content:market_cap,icon:'grid_view'},
          {title:"Volume",content:total_volume,icon:'equalizer'},{title:'Circulating supply',content:market_cap,icon:'schedule'},
          {title:'Popularity',content:`#${market_cap_rank}`,icon:'star'}

          ].map(data=><div className={styles.marketStat} key={data.title}>
            <div className={styles.marketStatLeft}><span className='material-icons' >{data.icon}</span><p style={{color:color.normalText}}>{data.title}</p></div>
            <div className={styles.marketStatRight}><p style={{color:color.normalText}}>{data.content}</p></div>
          </div>)}

          
    
        </div>
  )
}
