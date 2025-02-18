import React from 'react';
import styles from './VerificationContainer.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const VerificationContainer = () => {
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)

    let navigateHandler = (data)=>{
        navigate(data)

    }


    return (
        <div className={styles.verificationContainer} style={{backgroundColor:color.background}}>
            <div className={styles.imgContainer}>
                <img src='../../contact_1.png' />
            </div>

            <h1 className={styles.headText} style={{color:color.importantText}}>ID verification required</h1>

            <p className={styles.text} style={{color:color.normalText}}>Before making your first purchase,please verify your identity. Identity verification helps us ensure the safety and security of your crypto asset!</p>

            <div className={styles.buttonContainer}>

                <button onClick={()=>navigateHandler('/frontidentification')}>Let's do it</button>

                <button onClick={()=>navigateHandler(-1)} style={{backgroundColor:color.fadeColor,color:color.importantText}}>Take me back</button>

            </div>




        </div>
    )
}