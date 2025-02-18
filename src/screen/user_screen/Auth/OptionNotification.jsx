import React, { useState, useEffect } from 'react';
import styles from './OptionNotification.module.css';
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import SignoutModal from "../../../component/Modal/Signout";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import AuthNav from '../../../component/common/AuthNav';
import {  cancelRegisteration } from "../../../store/action/userAppStorage";


function OptionNotification() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isSignout, setIsSignout] = useState(false)

    let { id } = useParams()

    //initialise router
    let navigate = useNavigate()
    //initialising reduzx
    let dispatch = useDispatch()

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
    const continueHandler = async (e) => {
        e.preventDefault()
        navigate(`/phonesignup/${id}`)
    }

    let signoutHandler = ()=>{
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


    return (<>
        {isSignout && <SignoutModal closeModal={closeModal} cancelAuthProgress={cancelAuthProgress}/>}

        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />


        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>

                <div className={styles.imageContainer} >
                    <img src='../../../emailoption.png' />
                </div>

                <h1 className={styles.verifyHead}>Stay in the know</h1>

                <p className={styles.verifyParagraph}>Do you want to receive personalized email message about products,services and special offer based on interest and usage? </p>

                <form onSubmit={continueHandler}>
                    <SubmitBtn text='Yes' style={{ color: '#fff' }} />

                    <SubmitBtn text='No' style={{ color: '#fff' }} />
                </form>


            </div>
            <p className={styles.signout} onClick={signoutHandler}>Sign out</p>
        </div>



    </>

    );
}

export default OptionNotification;