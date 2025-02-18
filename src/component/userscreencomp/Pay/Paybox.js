import React from 'react'
import styles from './Paybox.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



export const PayBox = () => {
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)


    let navigateHandler = (data) => {

        navigate(`/${data}`)


    }

    return (
        <div className={styles.payBox}  style={{backgroundColor:color.background}}>
            <div className={styles.content}  style={{backgroundColor:color.background}}>
                <div className={styles.contentContainer}  style={{backgroundColor:color.background}}>
                    <h2  style={{color:color.importantText}}>Cypto gifts</h2>
                    <p  style={{color:color.normalText}}>Give crypto to your friends and family</p>

                </div>
                <div className={styles.imgContainer}  style={{backgroundColor:color.background}}>
                    <img src='../../pay.png' />

                </div>

            </div>


            <div className={styles.actionContainer}>
                <button onClick={() => navigateHandler('recieve')} style={{backgroundColor:color.fadeColor,color:color.importantText}}>Recieve</button>

                <button onClick={() => navigateHandler('send')}>Send</button>

            </div>






        </div>)
}