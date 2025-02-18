import React, { useState } from 'react';
import styles from './ChangeForm.module.css';

export const NewPhoneFormContainer = () => {
    //setting state for this project

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')


    


    let submitHandler = (e) => {
        e.preventDefault()
    }



    return (
        <form onSubmit={submitHandler}>
            <div className={styles.formContainer}>

                <div className={styles.formHead}>

                    <div className={styles.inputCon}>
                        <label>Enter new phone</label>
                        <input />
                    </div>



                    <div className={styles.buttonCon}>
                        <button style={{backgroundColor:'#1652f0',color:'#fff'}} >Change phone number</button>
                    </div>


                </div>






            </div>

        </form>

    )
}
