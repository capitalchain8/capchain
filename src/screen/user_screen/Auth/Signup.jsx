import React, { useState, useCallback } from 'react';
import styles from './signup.module.css';
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal"
import FormInput from "../../../component/common/input";
import SubmitBtn from "../../../component/common/Submit";
import { signupUser } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Modal from "../../../component/Modal/Modal";

function SignupScreen() {
    let [userEmail, setUserEmail] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userFirstName, setUserFirstName] = useState("")
    let [userLastName, setUserLastName] = useState("")
    let [isFirstNameError, setIsFirstNameError] = useState("")
    let [isCheckbox, setIsCheckbox] = useState(false)
    let [isLastNameError, setIsLastNameError] = useState("")
    let [isEmailError, setIsEmailError] = useState("")
    let [isPasswordError, setIsPasswordError] = useState("")
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)

    let [isUrl, setIsUrl] = useState('')

    //initialising reduzx
    let dispatch = useDispatch()

    //initialising router
    let navigate = useNavigate()
    //loaders state
    let isFormValid = userEmail && userPassword && !isEmailError && !isPasswordError && userFirstName && userLastName && !isFirstNameError && !isLastNameError && isCheckbox

    let navigateHandler = (url) => {
        navigate(url)
    }

    let setFormDetails = useCallback(e => {
        if (e.formName === "userEmail") {
            let formValue = e.value
            setUserEmail(formValue)
            setIsEmailError(e.error)

        } else if (e.formName === "userPassword") {
            let formValue = e.value
            setIsPasswordError(e.error)
            setUserPassword(formValue)
        }
        else if (e.formName === "userFirstName") {
            let formValue = e.value
            setUserFirstName(formValue)
            setIsFirstNameError(e.error)
        }
        else if (e.formName === "userLastName") {
            let formValue = e.value
            setUserLastName(formValue)
            setIsLastNameError(e.error)
        }
    }, [])

    let checkBoxHandler = () => {
        setIsCheckbox(prev => !prev)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        //if forms are not valid,do nothing
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(signupUser({ firstName: userFirstName, lastName: userLastName, email: userEmail, password: userPassword }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setIsUrl(response.url)
        } else {
            setIsLoading(false)
            //navigate to login
            navigate(`/verification/${userEmail}`)
        }
    }

    const closeModal = () => {
        setIsError(false)
        //navigate to other page
        navigate(isUrl)
    }

    const goBackHandler = () => {
        navigate('/')
    }

    return (<>
        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <div className={styles.signupNavigation}>

            <div className={styles.navigationLeft}>
                <span className='material-icons' onClick={goBackHandler}>
                    arrow_backward
                </span>

            </div>
            <div className={styles.navigationRight}>
                <button onClick={() => navigateHandler('/login')}>
                    Sign In
                </button>

            </div>
        </div>

        <div className={styles.form_screen} >

            <div className={styles.form_outercontainer}>
                <form className={styles.form_container} onSubmit={submitHandler}>
                    <h1 className={styles.heading}>Create an account</h1>

                    <div className={styles.info_section}>
                        <div className={styles.info_left}>
                            <h2>Do more with crypto, only on capchain</h2>
                            <p>Set up your account and verify your photo ID to get started on trading crypto.</p>

                        </div>

                        <div className={styles.info_right}>
                            <img src='../../../signup.png' />

                        </div>

                    </div>

                    <p className={styles.requiredText}>Required fields have an asterisk: *</p>



                    <div className={styles.inputContainer}>
                        <div className={styles.inputLeft}>
                            <FormInput
                                icon='edit'
                                label='First Name'
                                type='text'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="userFirstName"
                                placeholder='First name'
                            />

                        </div>

                        <div className={styles.inputRight}>
                            <FormInput
                                icon='edit'
                                label='Last Name'
                                type='text'
                                className="formcard"
                                setFormDetails={setFormDetails}
                                formName="userLastName"
                                placeholder='Last name'
                            />

                        </div>

                    </div>




                    <FormInput
                        icon='edit'
                        label='Email'
                        type='email'
                        className="formcard"
                        setFormDetails={setFormDetails}
                        formName="userEmail"
                        placeholder='Email'
                    />
                    <FormInput
                        icon='edit'
                        label='Password'
                        type='number'
                        types="password"
                        className="formcard"
                        formName="userPassword"
                        setFormDetails={setFormDetails}
                        placeholder='Enter 7 digits'

                    />

                    <div className={styles.policy_container}>
                        <div className={styles.policy_left}>
                            <input type='checkbox' value={true}
                                onChange={checkBoxHandler} style={{ backgroundColor: isCheckbox ? '#1652f0' : '#fff' }} />
                        </div>

                        <div className={styles.policy_right}>
                            <p>
                                I certify that I am 18 years of age or older, I agree to the User Agreement, and I have read the Privacy Policy.
                            </p>

                        </div>




                    </div>



                    <SubmitBtn style={{ opacity: isFormValid ? 1 : 0.5 }} text="Signup" />

                    {/*<div className={styles.piracyContainer} >
                        <p onClick={() => navigateHandler('/login')}>Login instead</p>
                        <p onClick={() => navigateHandler('/policy')}>Privacy Policy</p>
                        </div>*/}
                </form >

            </div>

            <div className={styles.right_section}>
                <div className={styles.right_container}>
                    <div className={styles.rightinfo_section}>
                        <div className={styles.rightinfo_left}>
                            <h2 className={styles.heading}>Do more with crypto, only on capchain</h2>
                            <p>Set up your account and verify your photo ID to get started on trading crypto.</p>

                        </div>

                        <div className={styles.rightinfo_right}>
                            <img src='../../../signup.png' />

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </>

    );
}

export default SignupScreen;