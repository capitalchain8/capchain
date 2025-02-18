import React, { useState } from 'react';
import styles from './ChangeForm.module.css';

export const ConfirmFormContainer = () => {
    //setting state for this project



    let submitHandler = (e) => {
        e.preventDefault()
    }



    return (
        <form onSubmit={submitHandler}>
            <div className={styles.formContainer}>

                <div className={styles.formHead}>

                    <div className={styles.inputCon}>
                        <label>Enter verification code sent to xxxxxxx47 to confirm! </label>
                        <input placeholder='0078567'  />
                    </div>



                    <div className={styles.buttonCon}>
                        <button style={{backgroundColor:'#1652f0',color:'#fff'}} >Change phone number</button>
                    </div>


                </div>






            </div>

        </form>

    )
}
