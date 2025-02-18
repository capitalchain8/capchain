import React from 'react';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

let TradeModal = ({closeModal}) => {
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)

    let navigateHandler = (data)=>{
        closeModal()
        navigate(`/assets/${data}`)
    }


    return <div className={styles.trademodal_screen}>
        <div className={styles.buy_modal_con}>
            <div className={styles.top}>

            </div>

            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <p style={{color:color.importantText}}>Buy and sell crypto to start earning profits</p>
                <div className={styles.buy_con}>
                    <button onClick={()=>navigateHandler('buy')}>Buy</button>
                    <button onClick={()=>navigateHandler('sell')} style={{backgroundColor:color.normalText,color:color.importantText}}>Sell</button>
                </div>

            </div>

        </div>

    </div>
}

export default TradeModal