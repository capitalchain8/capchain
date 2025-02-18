import React from 'react';
import styles from './ChangeForm.module.css';
import { useSelector } from "react-redux";



export const ChangePinContainer = ({openPinModal}) => {
    let { user,color } = useSelector(state => state.userAuth)
    //setting state for this project

    let submitHandler = (e) => {
        e.preventDefault()
        openPinModal()
    }



    return (
        <form style={{backgroundColor:color.background}}>
            <div className={styles.formContainer} style={{backgroundColor:color.background}}>

                <div className={styles.formHead} style={{backgroundColor:color.background}}>
                  
                    <div className={styles.phoneCon}>
                        <span className='material-icons' style={{color:color.importantText}}>
                            lock
                        </span>
                        <p style={{color:color.normalText}}>xxxx</p>
            
                    </div>

                    

                    <div className={styles.buttonCon}>
                        <button onClick={submitHandler} style={{backgroundColor:color.fadeColor,color:color.importantText}} >Change security pin</button>
                    </div>

    
                </div>


               



            </div>

        </form>

    )
}
