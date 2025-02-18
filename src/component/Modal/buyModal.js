import React from 'react';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

let BuyModal = ({content,closeModal}) => {
    let { color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    let navigateHandler = (data)=>{
        if(data === 'bank'){
            navigate(`/calculate/send/${content.coin.id}/${content.coin.symbol}/${content.coin.current_price}/bank`)
        }else{
            navigate(`/calculate/send/${content.coin.id}/${content.coin.symbol}/${content.coin.current_price}/wallet`)

        }
    }


    return <div className={styles.modal_screen}>
        <div className={styles.buy_modal_con}>
            <div className={styles.top}>

            </div>

            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <h1 style={{color:color.importantText}}>Send Bitcoin to ??</h1>
                <div className={styles.buy_con}>
                    <button onClick={()=>navigateHandler('bank')}>Bank account</button>
                    <button onClick={()=>navigateHandler('wallet')} style={{backgroundColor:color.normalText,color:color.importantText}}>Wallet address</button>

                </div>





            </div>

        </div>

    </div>
}

export default BuyModal
