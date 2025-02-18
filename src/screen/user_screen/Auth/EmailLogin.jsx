import React, { useState, useCallback,useEffect } from 'react';
import styles from './EmailLogin.module.css';
//import nav bar
import FormInput from '../../../component/common/input';
import SubmitBtn from "../../../component/common/Submit";
import { isEmailExist } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
//import routers
import { useNavigate } from 'react-router-dom';
import { useSelector} from "react-redux";

//let { admin} = useSelector(state => state.userAuth)
function LoginScreen() {
  let [userEmail, setUserEmail] = useState("")
  let [isEmailError, setIsEmailError] = useState("")
  let [isError, setIsError] = useState(false)
  let [isErrorInfo, setIsErrorInfo] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  //initialising reduzx
  let dispatch = useDispatch()
  let { color } = useSelector(state => state.userAuth)
  //initialise router
  let navigate = useNavigate()
  //loaders state
  let isFormValid = userEmail && !isEmailError


  //handling navigations
  let navigateHandler = (url) => {
    navigate(url)
  }



  let setFormDetails = useCallback(e => {
    if (e.formName === "userEmail") {
      let formValue = e.value
      setUserEmail(formValue)
      setIsEmailError(e.error)
    }
  }, [])








  const submitHandler = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      return
    }
    setIsLoading(true)

    let response = await dispatch(isEmailExist({ email: userEmail }))

    if (!response.bool) {
      setIsLoading(false)
      setIsError(true)
      setIsErrorInfo(response.message)

    } else {
      setIsLoading(false)
      //navigate to login

      navigate(`/signin/${userEmail}`)

    }
  }

  const goBackHandler = () => {
    navigate('/')
  }









  return (<>
    {isLoading && <LoadingModal />}

    <div className={styles.form_outercontainer}>
      <form className={styles.form_container} onSubmit={submitHandler}>
        <h1>capchain</h1>

        <span className='material-icons' onClick={goBackHandler}>arrow_backward</span>

        <h2>Sign in to capchain</h2>

        <p>Not your device? Use a private or incognito window to sign in.</p>


        <FormInput
          icon='edit'
          label='Email'
          type='email'
          types="email"
          className="formcard"
          formName="userEmail"
          setFormDetails={setFormDetails}
        />

        {isError ? <p className={styles.errortext}>{isErrorInfo}</p> : <></>}

        <SubmitBtn text='Continue' />


        <div className={styles.piracyContainer} >
          <p onClick={() => navigateHandler('/policy')}  >Privacy Policy</p>
        </div>

      </form >
    </div>

  </>

  );
}

export default LoginScreen;