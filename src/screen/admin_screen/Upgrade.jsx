import React, { useState, useEffect } from 'react'
import SideBar from "../../component/admin/sidebar"
import styles from './Upgrade.module.css'
import { loadClients,deleteClient } from "../../store/action/userAppStorage";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Modal from "../../component/Modal/Modal";
import LoadingModal from "../../component/Modal/LoadingModal"
import User from "../../component/admin/dashboardUser";


let UpgradeScreen = () => {
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(true)
    let [clients, setClients] = useState([])
    let dispatch = useDispatch()
    //initialise router
    let navigate = useNavigate()
    let { admin} = useSelector(state => state.userAuth)

    let fetchClients = async()=>{
        let res = await dispatch(loadClients())
            
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(res.message)
        } else {
            setIsLoading(false)
            //navigate to login
            setClients(res.message)
        }
    }

    useEffect( () => {
        
            if(!admin){
                return navigate('/')
            }
           fetchClients()
       

    }, [])

    const closeModal = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            let res = await dispatch(loadClients())
            if (!res.bool) {
                setIsLoading(false)
                setIsError(true)
                setIsErrorInfo(res.message)
            } else {
                setIsLoading(false)
                //navigate to login
                setClients(res.message)
            }

        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
        }
    }


    const navigateHandler = (id)=>{
        navigate(`/upgrade/${id}`)
    }

    const deleteHandler = async(id)=>{
        
        setIsLoading(true)
        let res = await dispatch(deleteClient(id))
        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(res.message)
        } else {
            setClients(res.message)
            setIsLoading(false)


        }
    }




    return <>
        {isError && <Modal showModal={isError} closeModal={closeModal} content={isErrorInfo} />}

        {isLoading && <LoadingModal />}
        <div className='dashboardScreen'>
            <SideBar />
            <div className={styles.dashboard_main}>
                <div className={styles.dashboard_main_header}>
                    <h1>Update Client Info</h1>
                </div>
                {!isLoading && clients.map(data => <User
                    username={`${data.firstName} ${data.lastName}`}
                    email={data.email}
                    imageUrl={data.photo}
                    navigateHandler = {navigateHandler}
                    key = {data._id}
                    id={data._id}
                    deleteHandler={deleteHandler}
                />)}


            </div>
           
        </div></>
}

export default UpgradeScreen