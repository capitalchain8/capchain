import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { NotificationBox } from './NotificationBox';
import { getNotifications } from '../../../store/action/userAppStorage';
import { Error } from './../Error';
import { Loader } from './../Loader';
import { useDispatch,useSelector } from 'react-redux';


export const NotificationCom = () => {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [notifications,setNotifications] = useState([])
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)

    useEffect(() => {
        //asynchronous request
        let timeout = setTimeout(() => {
            setIsLoading(false)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }
    })

    useEffect(() => {
        fetchNotification()
    }, [])

    let fetchNotification = async () => {
        setIsLoading(true)
        let res = await dispatch(getNotifications())
        if (!res) {
            return
        }
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        setNotifications(res.message.arr)
        setIsLoading(false)

    }




    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<>
        {!isLoading && <div className={styles.notificationScreen} style={{ height: '89vh',backgroundColor:color.background }}  >
            <div className={styles.pay} style={{backgroundColor:color.background}}>
                <NotificationBox notifications={notifications} />
            </div>


        </div>}
    </>



    )
}