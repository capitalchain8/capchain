import React from 'react';
import styles from './MainCalculator.module.css';
import { Block } from './Block';
import { Submit } from '../Submit';
import { useSelector } from "react-redux";



export const MainCalculator = ({buttonClick,deleteHandler,availableBalance,swapHandler,point,buttonValue,result,continueHandler,from,to,balance,userasset,id}) => {

    let { color } = useSelector(state => state.userAuth)


    return (
        <div className={styles.calculatorContainer} style={{backgroundColor:color.background}}>
            {userasset?<div className={styles.amountBalance}>
                <p> {balance} of {id} available </p>
            </div>:<div className={styles.amountBalance}>
                <p> 0 of {id} available </p>
            </div>}

            <div className={styles.conversionContainer}>

                <div className={styles.leftButton}>
                    <span style={{color:color.importantText,backgroundColor:color.fadeColor}}>Max</span>
                </div>

                <Block data={buttonValue} result={result}  from={from} to={to}/>


                <div className={styles.rightButton} onClick={swapHandler} >
                    <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>
                        swap_vert
                    </span>
                </div>

            </div>




            <div className={styles.calculatorbuttonCon}>
                <Submit buttonClick={buttonClick} deleteHandler={deleteHandler} point={point} continueHandler={continueHandler}/>

            </div>




        </div>
    )
}
