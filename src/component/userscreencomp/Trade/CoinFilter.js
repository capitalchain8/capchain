import React from 'react';
import styles from './CoinFilter.module.css';
import { useSelector } from "react-redux";


export const CoinFilter = ({ searchHandler, selectHandler }) => {
    let { color } = useSelector(state => state.userAuth)

    return (<div className={styles.filterContainer} style={{ backgroundColor: color.background }}>
        <div className={styles.searchinputContainer} style={{ backgroundColor: color.fadeColor }}>
            <span className='material-icons' style={{ color: color.importantText }}>
                search
            </span>

            <input className={styles.searchinput} onChange={searchHandler} placeholder='Search all assets' style={{backgroundColor:color.fadeColor}}/>
            <span className='material-icons' style={{ color: color.importantText }}>
                close
            </span>

        </div>
        <div className={styles.searchselectorcontainer} style={{ backgroundColor: color.fadeColor }}>
            <select className={styles.searchselector} onChange={selectHandler} style={{ backgroundColor: color.fadeColor }}>
                <option>All assets</option>
                <option>Watchlist</option>
            </select>
            <span className='material-icons' style={{ color: color.importantText }}>
                arrow_drop_down
            </span>
        </div>


    </div>)
}