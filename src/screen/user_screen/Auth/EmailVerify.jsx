import React, { useState, useEffect } from 'react';
import styles from './EmailVerify.module.css';
import { verifiedEmail, cancelRegisteration } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import SignoutModal from "../../../component/Modal/Signout";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import AuthNav from '../../../component/common/AuthNav';


function EmailVerify() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isSignout, setIsSignout] = useState(false)

    let { id } = useParams()

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
    const continueHandler = async () => {
        let res = await dispatch(verifiedEmail({ email: id }))
        if (!res.bool) {
            return
        }
        //navigation on sucessful api call
        navigate(`/notificationoption/${id}`)
    }

    useEffect(() => {
        let interval = setInterval(continueHandler, 1000)
        return () => {
            clearInterval(interval)
        }
    })

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




    return (<>
        {isSignout && <SignoutModal closeModal={closeModal} cancelAuthProgress={cancelAuthProgress} />}

        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />


        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>

                <div className={styles.imageContainer} >
                    <img src='../../../photo1(7).png' />
                </div>

                <h1 className={styles.verifyHead}>Verify your email</h1>

                <p className={styles.verifyParagraph}>We sent a verification email to <span> {id}</span>. Click the link inside to get started!</p>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    cancelAuthProgress()
                }}>
                    <SubmitBtn text='Email didnt arrive ?' style={{ color: '#fff' }} />

                </form>


                <p className={styles.signout} onClick={signoutHandler}>Sign out</p>

            </div>



        </div>



    </>

    );
}

export default EmailVerify;