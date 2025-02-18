import React, { useState, useEffect } from 'react';
import styles from './AddCard.module.css';
import { sendCryptoToWallet } from "../../../store/action/userAppStorage";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from '../../../component/common/Submit';
import { useDispatch, useSelector } from "react-redux";
import AuthNav from '../../../component/common/AuthNav';



function WalletForm() {
    //setting state for this project
    let [walletAddress, setWalletAddress] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let { user, color } = useSelector(state => state.userAuth)


    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsErrorInfo('Enter recipient information to complete transaction!')
            setIsError(true)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])



    //initialising reduzx
    let dispatch = useDispatch()

    //let { } = useSelector(state => state.userAuth)

    //initialise router
    let navigate = useNavigate()

    //method to close handler
    const closeModal = () => {
        setIsError(false)
        setIsErrorInfo('')
    }



    let { asset, amount, price } = useParams()

    let changeWalletName = (e) => {
        setWalletAddress(e.target.value)
    }
   

    let sendHandler = async (e) => {
        e.preventDefault()
        if (!walletAddress) {
            return
        }
        let data = {
            walletAddress: walletAddress,
            assetData: {
                quantity: amount,
                name: asset
            }
        }

        console.log(data)
        setIsLoading(true)

        let res = await dispatch(sendCryptoToWallet(data))

        if (!res.bool) {
            setIsError(true)
            setIsErrorInfo(res.message)
            setIsLoading(false)
            navigate(`/${res.url}`)
            return
        }
        navigate('/home')

    }





    return (<>
        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />

        <div className={styles.screenContainer} style={{backgroundColor:color.background,height:'100vh'}}>
            <div className={styles.innerContainer} style={{backgroundColor:color.background}}>

                <h1 className={styles.headText} style={{color:color.importantText}}>Recipient's  Wallet Address</h1>

                <div className='topboxunderline'>

                </div>


                <form className={styles.formContainer} onSubmit={sendHandler}>



                    <div className={styles.formCard}>
                        <label style={{color:color.normalText}}>Enter address</label>
                        <input className={styles.input}
                           placeholder='Enter crypto address' required={true} 
                           value={walletAddress} 
                           onChange={changeWalletName}
                           style={{backgroundColor:color.fadeColor,color:color.normalText}}/>



                    </div>
                    <div className={styles.buttonContainer}>
                        <SubmitBtn text='Continue' />
                    </div>
                </form>

                <div className='boxunderline'>

                </div>










            </div>

        </div >



    </>

    );
}

export default WalletForm;