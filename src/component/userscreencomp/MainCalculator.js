import React from 'react';
import styles from './MainCalculator.module.css';
import { Block } from './Block';
import { Submit } from './Submit';
import { useSelector} from "react-redux";



export const MainCalculator = ({ buttonClick, deleteHandler, availableBalance, swapHandler, point, buttonValue, result, priceFormat, continueHandler, id, symbol,balance,userasset,imgUrl }) => {

    let { color } = useSelector(state => state.userAuth)

   
    return (
        <div className={styles.calculatorContainer} style={{backgroundColor:color.background}}>
            {userasset?<div className={styles.amountBalance}>
                <p style={{color:color.importantText}}> {balance} of {id} available </p>
            </div>:<div className={styles.amountBalance}>
                <p style={{color:color.importantText}}> 0 of {id} available </p>
            </div>}

            <div className={styles.conversionContainer}>

                <div className={styles.leftButton} >
                    <span style={{backgroundColor:color.fadeButtonColor,color:color.importantText}}>Max</span>
                </div>

                <Block data={buttonValue} result={result} priceFormat={priceFormat} symbol={symbol} />


                <div className={styles.rightButton} onClick={swapHandler}>
                    <span className='material-icons' style={{backgroundColor:color.fadeButtonColor,color:color.importantText}}>
                        swap_vert
                    </span>
                </div>

            </div>


            <div className={styles.cryptoCard} style={{backgroundColor:color.fadeButtonColor}}>
                <div className={styles.imgCon} >
                    <img src={imgUrl} />
                    <p style={{color:color.normalText}}>{id}</p>

                </div>
                <div className={styles.conversionCon}  >
                    <p style={{color:color.normalText}}>$1.0</p>
                    <p style={{color:color.normalText}}>0.000 {symbol}</p>
                </div>
            </div>



            <div className={styles.calculatorbuttonCon}>
                <Submit buttonClick={buttonClick} deleteHandler={deleteHandler} point={point} continueHandler={continueHandler} />

            </div>




        </div>
    )
}
