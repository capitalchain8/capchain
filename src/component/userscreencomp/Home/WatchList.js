import React from 'react';
import styles from './WatchList.module.css';
import { CoinSection } from '../CoinSection';
import { useSelector } from "react-redux";



export const WatchList = React.memo(({ data ,navigateHandler,buy,selectHandler}) => {
    let { color } = useSelector(state => state.userAuth)

    
    return (
        <div className={styles.watchListContainer}>
            <div className={styles.watchListHead}>
                <h1 style={{color:color.importantText}}>Prices</h1>

                <div className={styles.select} style={{backgroundColor:color.fadeColor}}>
                    <select onChange={selectHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}}>
                        <option >All assets</option>
                        <option>WatchList</option>
                    </select>
                    <span className='material-icons' style={{color:color.importantText}}>
                        expand_more

                    </span>

                </div>


            </div>


            <div className={styles.watchList}>

                {data.map(data => <CoinSection key={data.id} coin={data}  navigateHandler={navigateHandler} buy={buy}/>)}

            </div>

        </div>


    )
})
