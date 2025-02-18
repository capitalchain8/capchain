import React, { useState, useEffect } from 'react'
import SideBar from "../../component/admin/sidebar"
import styles from './Upgrade.module.css'
import { loadClients } from "../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Modal from "../../component/Modal/Modal";
import LoadingModal from "../../component/Modal/LoadingModal"
import User from "../../component/admin/dashboardUser"

let UpgradeScreen = () => {
    const [isError, setIsError] = useState(false)
    const [isErrorInfo, setIsErrorInfo] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [clients, setClients] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { admin } = useSelector(state => state.userAuth)


    const fetchClients = async () => {
        try {
            if (!admin) {
                return navigate('/')
            }
            const res = await dispatch(loadClients())
            if (!res.bool) {
                setIsLoading(false)
                setIsError(true)
                setIsErrorInfo(res.message)
            } else {
                setIsLoading(false)
                setClients(res.message)
            }
        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
        }
    }



    useEffect(() => {
        fetchClients()
    }, [])


    

    const closeModal = async () => {
        setIsLoading(true)
        setIsError(false)
        try {
            const res = await dispatch(loadClients())
            if (!res.bool) {
                setIsLoading(false)
                setIsError(true)
                setIsErrorInfo(res.message)
            } else {
                setIsLoading(false)
                setClients(res.message)
            }
        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
        }
    }

    const navigateHandler = (id) => {
        navigate(`/fund/${id}`)
    }

    return (
        <>
            {isError && <Modal showModal={isError} closeModal={closeModal} content={isErrorInfo} />}
            {isLoading && <LoadingModal />}
            <div className='dashboardScreen'>
                <SideBar />
                <div className={styles.dashboard_main}>
                    <div className={styles.dashboard_main_header}>
                        <h1>Fund Clients Account</h1>
                    </div>

                    {!isLoading && clients.length > 0 ? (
                        clients.map((data) => (
                            <User
                                username={`${data.firstName} ${data.lastName}`}
                                email={data.email}
                                imageUrl={data.photo}
                                navigateHandler={navigateHandler}
                                key={data._id}
                                id={data._id}
                            />
                        ))
                    ) : (
                        !isLoading && <p>No clients found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpgradeScreen
