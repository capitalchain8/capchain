import React, { useState, useCallback,useEffect } from 'react';
import styles from './PasswordLogin.module.css';
//import nav bar
import FormInput from "../../../component/common/input"
import SubmitBtn from "../../../component/common/Submit";
import { loginUser } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal"
//import routers
import { useNavigate,useParams } from 'react-router-dom';
import Modal from "../../../component/Modal/Modal";

//let { admin} = useSelector(state => state.userAuth)
function LoginScreen() {
  let [userPassword, setUserPassword] = useState("")
  let [isPasswordError, setIsPasswordError] = useState("")
  let [isError, setIsError] = useState(false)
  let [isErrorInfo, setIsErrorInfo] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  //initialising reduzx
  let dispatch = useDispatch()
  //initialise router
  let navigate = useNavigate()

  let {id} = useParams()
  let timer

  useEffect(()=>{
    if(!id){
      navigate('/signin')
    }
  })

  //loaders state
  let isFormValid = userPassword && !isPasswordError

  let navigateHandler = (url) => {
    navigate(url)
  }

  let setFormDetails = useCallback(e => {
    if (e.formName === "userPassword") {
      let formValue = e.value
      setUserPassword(formValue)
      setIsPasswordError(e.error)
      setIsErrorInfo('')
      setIsError(false)
    }
  }, [])


  let loginNavigateHandler = ()=>{
    navigate('/signin')
  }




  const closeModal = () => {
    setIsError(false)
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      return
    }
    setIsLoading(true)
  
    let response = await dispatch(loginUser({ password:userPassword,email:id }))

    if (!response.bool) {
      setIsLoading(false)
      setIsError(true)
      setIsErrorInfo(response.message)
      timer = setTimeout(()=>{
        navigate(`/${response.url}`)
      },3000)

    } else {

      setIsLoading(false)
      navigate('/home')
    }
  }

  useEffect(()=>{
    return ()=>{
      clearTimeout(timer)
    }
  },[])




  return (<>
    {isLoading && <LoadingModal />}

    {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

    <div className={styles.form_outercontainer}>
      <form className={styles.form_container} onSubmit={submitHandler}>
        <h1>capchain</h1>

        <span className='material-icons arrow_back' onClick={loginNavigateHandler}>arrow_backward</span>

        <h2>Enter password</h2>

        <div className={styles.email_box} onClick={loginNavigateHandler}>
          <div className={styles.left_email_box}>
            <div>
              <span className='material-icons'>person</span>
            </div>

          </div>
          <div className={styles.right_email_box}>
            <p>{id}</p>
          </div>

        </div>


        <FormInput
          icon='edit'
          label='Password'
          type='number'
          types='password'
          maxLength={4}
          className="formcard"
          setFormDetails={setFormDetails}
          formName="userPassword"
        />

        {isError?<p className={styles.errortext}>{isErrorInfo}</p>:<></>}


        <p onClick={() => navigateHandler('/forgetPassword')} className={styles.forgetPasswordText}>Forget password</p>



        <SubmitBtn  text='Continue'  style={{color:'#fff'}}/>

        <div className={styles.cancelContainer} >
          <p onClick={() => navigateHandler('/')}>Cancel signing in</p>
        </div>

      </form >

    </div>



  </>

  );
}

export default LoginScreen;