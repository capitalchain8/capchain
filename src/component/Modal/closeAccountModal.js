import React,{useState,useEffect} from 'react';
import styles from './Modal.module.css';
import { useDispatch,useSelector  } from 'react-redux';
import { closeMyAccount } from '../../store/action/userAppStorage';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useNavigate } from 'react-router-dom';



let CloseAccountModal = ({ closeModal}) => {
    let [isLoading,setIsLoading] = useState(false)
    let [isInfo,setIsInfo] = useState(false)
    let [isError,setIsError] = useState(false)
    let navigate = useNavigate()
    let { user,color } = useSelector(state => state.userAuth)

    let timer

     let dispatch = useDispatch()

     useEffect(()=>{
        return ()=>{
            setIsError(false)
            setIsInfo('')
            clearTimeout(timer)
        }

     },[])
    


    let closeAccountHandler = async()=>{
        setIsLoading(true)
        let res = await dispatch(closeMyAccount())
        if(!res.bool){
            setIsInfo(res.message)
            setIsError(true)
            setIsLoading(false)
            timer = setTimeout(()=>{
                closeModal()

         },3000)
         return

        }
        setIsLoading(false)
        navigate('/')
        

    }


    return <div className={styles.changeInfomodal_screen}>
        <div className={styles.buy_modal_con}>
            <div className={styles.top}>

            </div>

            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <span className='material-icons' onClick={()=>closeModal()} style={{color:color.importantText}}>close</span>
                {isError?"":<h1 style={{color:color.importantText}}>Change Information</h1>}

                <p style={{color:color.normalText}}>{isError?`${isInfo}`:'Closing your account cannot be undone.contact admin!'}</p>

                <div className={styles.buy_con}>
                    <button onClick={closeAccountHandler}>{isLoading?<Spinner size={15} color={'#1652f0'} speed={.5} />:'Continue'}</button>

                </div>


            </div>

        </div>

    </div>
}

export default CloseAccountModal