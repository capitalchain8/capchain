import React from 'react';
import styles from './Coinlist.module.css';
import { CoinSection } from '../CoinSection';
import { CoinHead } from './CoinHead';
import { CoinFilter } from './CoinFilter';
import FlatList from 'flatlist-react';
import { useSelector } from "react-redux";


export const Coinlist = ({ filteredCoins, searchHandler, selectHandler, navigateHandler,buy,address }) => {
    let { color } = useSelector(state => state.userAuth)

    let renderItem = (coin, ids) => {
        return <CoinSection key={ids} coin={coin} navigateHandler={navigateHandler} buy={buy} address={address} />
    }
    
    let emptyRender = () => {
        return (<div className={styles.emptyScreen}>
            <h2 style={{color:color.importantText}}>No crypto found</h2>
        </div>)
    }


    return (
        <div className={styles.coinContainer} style={{backgroundColor:color.background}}>
            <div className={styles.filterContainer} style={{backgroundColor:color.background}}>
                <CoinFilter searchHandler={searchHandler} selectHandler={selectHandler} />
            </div>


            <div className={styles.tableContainer}>
                <div className={styles.tableHead}>
                    <CoinHead buy={buy} address={address}/>
                </div>

                <div className={styles.tableBody}>

                    <FlatList
                        list={filteredCoins}
                        renderItem={renderItem}
                        renderWhenEmpty={emptyRender}
                    />

                </div>


            </div>

        </div >

    )
}