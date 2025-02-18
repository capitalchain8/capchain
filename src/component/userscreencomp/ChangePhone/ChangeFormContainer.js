import React from 'react';
import styles from './ChangeForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { hashFun } from './../../../utils/functions';



export const ChangeFormContainer = ({openInfoModal}) => {
    //setting state for this project
    let navigate = useNavigate()
    let { user,color } = useSelector(state => state.userAuth)

    let submitHandler = (e) => {
        e.preventDefault()
        let data = {
            message:'cannot change phone for now for some security reasons.contact admin!'
        }
        openInfoModal(data)
    }



    return (
        <form>
            <div className={styles.formContainer} style={{backgroundColor:color.background}}>

                <div className={styles.formHead} style={{backgroundColor:color.background}}>
                  
                    <div className={styles.phoneCon} style={{backgroundColor:color.background}}>
                        <span className='material-icons' style={{color:color.importantText}}>
                            smartphone
                        </span>
                        <p  style={{color:color.normalText}}>{hashFun(user.number)}</p>
            
                    </div>

                    

                    <div className={styles.buttonCon}>
                        <button onClick={submitHandler}  style={{backgroundColor:color.fadeButtonColor,color:color.importantText}} >Change phone number</button>
                    </div>

    
                </div>


               



            </div>

        </form>

    )
}
