import React, { useState, useEffect } from 'react';
import styles from './AddCard.module.css';
import { addPaymentMethod } from "../../../store/action/userAppStorage";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from '../../../component/common/Submit';
import Cards from 'react-credit-cards-2';
import { useDispatch, useSelector } from "react-redux";
import AuthNav from '../../../component/common/AuthNav';
import 'react-credit-cards-2/dist/es/styles-compiled.css'



function AddCard() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')

    let [cardNumber, setCardNumber] = useState('')
    let [cardNumberError, setCardNumberError] = useState(false)
    let [cardNumberErrorText, setCardNumberErrorText] = useState('')
    let [nameOfBank, setNameOfBank] = useState('')
    let [accountNumber, setAccountNumber] = useState('')
    let [address, setAddress] = useState('')
    let [nameOnCard, setNameOnCard] = useState('')
    let [nameOnCardError, setNameOnCardError] = useState(false)
    let [nameOnCardErrorText, setNameOnCardErrorText] = useState('')
    let [expirationError, setExpirationError] = useState()
    let [expiration, setExpiration] = useState('')
    let [cvcError, setCvcError] = useState('')
    let [cvc, setCvc] = useState('')
    let [postalcode, setPostalcode] = useState('')
    let [postalcodeError, setPostalcodeError] = useState(false)
    let [focus, setFocus] = useState('')

    let { user, color } = useSelector(state => state.userAuth)



    let { id } = useParams()

    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsErrorInfo('Link your credit card to start trading cryptocurrencies!')
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



    let changeNameOnCardHandler = (e) => {
        let val = e.target.value
        setNameOnCard(val)
        if (val === '') {
            setNameOnCardErrorText('Please enter the name on your card')
            setNameOnCardError(true)
        } else {
            setNameOnCardErrorText('')
            setNameOnCardError(false)
        }
    }

    let changeCardNumber = (e) => {
        let val = e.target.value
        setCardNumber(val)
        if (val === '') {
            setCardNumberErrorText('Please enter a valid debit/credit card number')
            setCardNumberError(true)

        } else {
            setCardNumberErrorText('')
            setCardNumberError(false)
        }

    }

    let changeCvcHandler = (e) => {
        let val = e.target.value
        setCvc(val)
        if (val === '') {
            setCvcError(true)
        } else {
            setCvcError(false)

        }

    }

    let changeExpirationHandler = (e) => {
        let val = e.target.value
        setExpiration(val)
        if (val === '') {
            setExpirationError(true)
        } else {
            setExpirationError(false)
        }
    }

    let changeFocusHandler = (e) => {
        setFocus(e.target.name)
    }

    let changePostalcodeHandler = (e) => {
        let val = e.target.value
        setPostalcode(val)
        if (val === '') {
            setPostalcodeError(true)
        } else {
            setPostalcodeError(false)
        }
    }

    let changeNameOfBank = (e) => {
        setNameOfBank(e.target.value)
    }

    let changeAccountNumber = (e) => {
        setAccountNumber(e.target.value)
    }

    let changeAddress = (e) => {
        setAddress(e.target.value)
    }

    const addPaymentHandler = async (e) => {
        e.preventDefault()
        //check for validity
        if (cardNumberError || nameOnCardError || expirationError || cvcError || postalcodeError) {
            return
        }
        setIsLoading(true)

        let res = await dispatch(addPaymentMethod({
            postalCode: postalcode,
            cardCvc: cvc,
            cardExpiration: expiration,
            cardNumber: cardNumber,
            nameOnCard: nameOnCard,
            user: { email: id },
            bankName: nameOfBank,
            bankAccount: accountNumber,
            bankAddress: address
        }))


        if (!res.bool) {
            setIsError(true)
            setIsErrorInfo(res.message)
            setIsLoading(false)
            return
        }
        //after adding credit card navigate to dashboard
        navigate('/home')

    }




    return (<>
        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />


        <div className={styles.screenContainer} style={{ backgroundColor: !id ? color.background : '' }}>
            <div className={styles.innerContainer}>

                <h1 className={styles.headText} style={{ color: !id ? color.importantText : '' }}>Card Information</h1>

                <div className='topboxunderline'>

                </div>


                <form className={styles.formContainer} onSubmit={addPaymentHandler}>

                    <div className={styles.formCardImg}>
                        <Cards
                            focus={focus}
                            cvc={cvc}
                            expiry={expiration}
                            name={nameOnCard}
                            number={cardNumber}
                        />
                    </div>

                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Name on card</label>

                        <input className={styles.input}
                            onChange={changeNameOnCardHandler}
                            value={nameOnCard} placeholder='John Chris'
                            onFocus={changeFocusHandler} style={{ backgroundColor: !id ? color.fadeColor : '' }} />

                        {nameOnCardError && <p className={styles.errorText}>{nameOnCardErrorText}</p>}

                    </div>

                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Card number</label>

                        <div className={styles.cardNumberCon}>

                            <input className={styles.cardNumber} onChange={changeCardNumber}
                            onFocus={changeFocusHandler}

                            style={{backgroundColor:!id?color.fadeColor:''}}
                            />
                        </div>



                        {cardNumberError && <p className={styles.errorText}>Please enter a valid debit/credit card number</p>}

                    </div>


                    <div className={styles.formCard}>
                        <div className={styles.expiryCard}>
                            <div className={styles.formSmallerCard}>
                                <label style={{ color: !id ? color.normalText : '' }}>Expiration</label>
                                <input className={styles.input}
                                    type='number'
                                    onChange={changeExpirationHandler}
                                    value={expiration} onFocus={changeFocusHandler}
                                    style={{backgroundColor:!id?color.fadeColor:''}}
                                     />



                            </div>
                            <div className={styles.formSmallerCard}>
                                <label style={{ color: !id ? color.normalText : '' }}>CVC</label>

                                <input className={styles.input}
                                    type='number'
                                    onChange={changeCvcHandler}
                                    value={cvc}
                                    onFocus={changeFocusHandler}
                                    style={{backgroundColor:!id?color.fadeColor:''}}
                                     />



                            </div>


                        </div>

                        {expirationError || cvcError ? <p className={styles.errorText}>Please enter a valid expiration date</p> : <></>}

                    </div>

                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Postal code</label>
                        <input className={styles.input}
                            type='number'
                            onChange={changePostalcodeHandler}
                            value={postalcode}
                            onFocus={changeFocusHandler} 
                            style={{backgroundColor:!id?color.fadeColor:''}}/>
                    </div>


                    <h1 className={styles.headText} style={{ color: !id ? color.importantText : '',width:'100%' }}>Account Information</h1>


                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Name of bank</label>

                        <div className={styles.cardNumberCon}>

                            <input className={styles.cardNumber} onChange={changeNameOfBank}
                                value={nameOfBank}
                                style={{backgroundColor:!id?color.fadeColor:''}}
                            />
                        </div>

                    </div>




                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Account Number</label>
                        <input className={styles.input}
                            type='number'
                            onChange={changeAccountNumber}
                            value={accountNumber}
                            style={{backgroundColor:!id?color.fadeColor:''}} />
                    </div>


                    <div className={styles.formCard}>
                        <label style={{ color: !id ? color.normalText : '' }}>Address 1</label>
                        <input className={styles.input}
                            onChange={changeAddress}
                            value={address}
                            style={{backgroundColor:!id?color.fadeColor:''}} />
                    </div>


                    <p className={styles.terms} style={{ color: !id ? color.normalText : '' }}>By adding a new card, you agree to the <span>credit/debit card terms.</span></p>

                    <div className={styles.buttonContainer}>
                        <SubmitBtn text='Add Card' />
                    </div>

                </form>



                <div className='boxunderline'>

                </div>


                <div className={styles.securedContainer}>
                    <span className='material-icons'>lock</span>
                    <p className={styles.securedText} style={{color:!id?color.normalText:''}}> Processed by <span>capchain</span></p>
                </div>







            </div>

        </div >



    </>

    );
}

export default AddCard;