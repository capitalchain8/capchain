import React, { useState,useEffect } from 'react';
import styles from './PhoneVerification.module.css';
import { cancelRegisteration, phoneVerification } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import SignoutModal from "../../../component/Modal/Signout";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import AuthNav from '../../../component/common/AuthNav';

import {hashFun} from '../../../utils/functions';


function PhoneVerification() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isSignout, setIsSignout] = useState(false)
    let [code, setCode] = useState("")
    let [codeError, setCodeError] = useState("")
    let [isCodeError, setIsCodeError] = useState("")
    

    let { id,phoneId } = useParams()
  

    //initialising reduzx
    let dispatch = useDispatch()

    //initialise router
    let navigate = useNavigate()

    //method to close handler
    const closeModal = () => {
        setIsError(false)
        setIsSignout(false)
    }

    useEffect(() => {
        if (!id) {
            navigate('/signup')
        }
    })




    //this handler check if user email has been verified
    const submitHandler = async (e) => {
        e.preventDefault()
        if (isCodeError || !code) {
            return
        }
        //navigating to verifyPhone for testing purpose
        //navigate(`/verifyPhone/${id}/${phone}`)
        
        setIsLoading(true)
        //proceed to send sms code
        setIsError(false)
        setIsSignout(false)
        setIsErrorInfo('')
        let res = await dispatch(phoneVerification({ email: id, confirmationCode:code }))

        if (!res.bool) {
            setIsError(false)
            setIsErrorInfo(res.message)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        //navigating to the next page
        navigate(`/addcredentials/${id}`)
        
    }



    let signoutHandler = () => {
        setIsError(false)
        setIsSignout(true)
    }



    let cancelAuthProgress = async () => {
        setIsError(false)
        setIsSignout(false)
        setIsErrorInfo('')
        let res = await dispatch(cancelRegisteration({ email: id }))

        if (!res.bool) {
            setIsError(true)
            setIsErrorInfo(res.message)
            return
        }
        navigate('/signup')

    }

    let changeCodeHandler = (e) => {
        let data = e.target.value
        setCode(e.target.value)

        if (data.length === 0) {
            setCodeError("field should not be empty")
            setIsCodeError(true)
        }
        else if (data.length <= 2) {
            setCodeError("characters size too small")
            setIsCodeError(true)
        }
        else if (!data.match(/[0-9.]/g)) {
            setCodeError("number is not valid")
            setIsCodeError(true)
        }
        else {
            setCodeError("")
            setIsCodeError(false)
        }
    }


   




    return (<>
        {isSignout && <SignoutModal closeModal={closeModal} cancelAuthProgress={cancelAuthProgress} />}

        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />


        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>

                <h1 className={styles.headText}>Enter verification code</h1>

                <p className={styles.paragraphText}>A text message with a 7-digit code has been sent to {hashFun(phoneId)} . This helps us keep your account secure by verifying thats its really you. </p>

                <form >
                    <label>Enter verification code</label>
                    <input onChange={changeCodeHandler}
                        value={code}
                        required={true}
                    />
                    <p className={styles.codeerror}>{codeError}</p>

                    <SubmitBtn text='Submit' style={{ color: '#fff' }} onClick={submitHandler} />

                    <SubmitBtn text='Resend code' style={{ color: '#fff',backgroundColor:'rgb(240,240,240)' }} buttonTextColor='black' onClick={()=>navigate(-1)} />

                </form>




            </div>
            <p className={styles.signout} onClick={signoutHandler}>Use another phone number</p>
        </div >



    </>

    );
}

export default PhoneVerification;