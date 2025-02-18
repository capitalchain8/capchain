import React from 'react';
import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

let TransferModal = ({ closeModal}) => {
    let { color } = useSelector(state => state.userAuth)

    let navigate = useNavigate()

    let navigateHandler = (data)=>{
        closeModal()
        navigate(`/${data}`)
    }


    return <div className={styles.trademodal_screen}>
        <div className={styles.buy_modal_con}>
            <div className={styles.top}>

            </div>

            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <p style={{color:color.importantText}}>Send and recieve cash and crypto on capchain.</p>
                <div className={styles.buy_con}>
                    <button onClick={()=>navigateHandler('send')}>Send</button>
                    <button onClick={()=>navigateHandler('recieve')} style={{backgroundColor:color.normalText,color:color.importantText}}>Recieve</button>

                </div>


            </div>

        </div>

    </div>
}

export default TransferModal