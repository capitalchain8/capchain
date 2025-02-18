import React, { useState, useEffect } from 'react';
import styles from './Update.module.css';
import { updateCredentials  } from "../../../store/action/userAppStorage";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import { useNavigate} from 'react-router-dom';
import SubmitBtn from '../../../component/common/Submit';
import { useDispatch, useSelector } from "react-redux";
import AuthNav from '../../../component/common/AuthNav';



function UpdateUserInfo() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let { user, color } = useSelector(state => state.userAuth)

    let [firstName, setFirstName] = useState(user.firstName)
    let [lastName, setLastName] = useState(user.lastName)

    




    useEffect(() => {
        let timeout = setTimeout(() => {
            setIsErrorInfo('Update your information if you need to!')
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

    let changeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    let changeLastName = (e) => {
        setLastName(e.target.value)
    }



    const updateHandler = async (e) => {
        e.preventDefault()
        //check for validity
        if (!firstName || !lastName) {
            return
        }
        setIsLoading(true)

        let res = await dispatch(updateCredentials({
            firstName,
            lastName
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
        <div style={{ backgroundColor:color.background,height:'100vh'}}>
            <AuthNav />


        <div className={styles.screenContainer} style={{ backgroundColor:color.background}}>
            <div className={styles.innerContainer} style={{ backgroundColor:color.background}}>

                <h1 className={styles.headText} style={{ color:color.importantText}}>Personal Information</h1>

                <div className='topboxunderline'>

                </div>


                <form className={styles.formContainer} onSubmit={updateHandler }>

                    

                    <div className={styles.formCard}>
                        <label style={{ color:color.normalText  }}>First Name</label>

                        <input className={styles.input}
                            placeholder='Harry' required={true} value={firstName} onChange={changeFirstName} style={{ backgroundColor:color.fadeColor,color:color.importantText }} />

            

                    </div>

                    <div className={styles.formCard}>
                        <label style={{ color:color.normalText }}>Last Name</label>

                        <div className={styles.cardNumberCon}>

                            <input className={styles.cardNumber} placeholder='John' required={true}
                                value={lastName}
                                onChange={changeLastName}

                            style={{backgroundColor:color.fadeColor,color:color.importantText}}
                            />
                        </div>




                    </div>


                    <div className={styles.buttonContainer}>
                        <SubmitBtn text='Update' />
                    </div>

                </form>



                <div className='boxunderline'>

                </div>









            </div>

        </div >


        </div>

        



    </>

    );
}

export default UpdateUserInfo;