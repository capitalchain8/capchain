import React, { useState} from 'react';
import styles from './formContainer.module.css';
import { useSelector } from "react-redux";


export const TopUpForm = () => {
    //setting state for this project
    let [walletAddress, setWalletAddress] = useState('')
    let { color } = useSelector(state => state.userAuth)


    let changeWalletName = (e) => {
        setWalletAddress(e.target.value)
    }

    let submitHandler = () => {
        return
    }



    return (
        <div className={styles.walletFormContainer} style={{backgroundColor:color.background}}>

            <div className={styles.formHead} style={{backgroundColor:color.background}}>
                <div className={styles.form} style={{backgroundColor:color.background}}>
                    <label style={{color:color.normalText}}>Enter amount in $ dollars to top up and ensure your billing address is correct for funding to be successfull</label>
                    <input placeholder='Enter amount' required={true} value={walletAddress} onChange={changeWalletName} type='number' style={{backgroundColor:color.fadeColor,color:color.importantText}} />
                </div>

                <div className={styles.buttonCon}>
                    <button onClick={submitHandler}>Top up</button>
                </div>

            </div>
            


            



        </div>
    )
}
