import React from 'react';
import styles from './Verification.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";



export const Verification = () => {
    let { color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    let photoVerificationHandler = ()=>{
        navigate('/frontidentification')
    }

    return (
        <div className={styles.verificationContainer} style={{backgroundColor:color.background}}>
            <div className={styles.tab}>
                <ul>
                    <li style={{color:color.importantText}}>Buy</li>

                    <li style={{color:color.importantText}}>Sell</li>

                    <li style={{color:color.importantText}}>Convert</li>

                </ul>
            </div>

            <div className={styles.content}>
                <div className={styles.warning}>
                    <span className='material-icons'>
                        warning
                    </span>

                </div>

                <h2>Identity Verification Required</h2>
                <p>Before making your first purchase, please verify your identity. Identity verification helps us ensure the safety and security of your Coinbase account.</p>

                <button onClick={photoVerificationHandler}>
                    Submit ID
                </button>

            </div>


        </div>






    )
}