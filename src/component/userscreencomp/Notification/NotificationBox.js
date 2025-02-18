import React,{} from 'react';
import styles from './NotificationBox.module.css'
import { NotificationCard } from './NotificationCard';
import { useSelector } from "react-redux";



export const NotificationBox = ({notifications}) => {
    let { color } = useSelector(state => state.userAuth)

    return (
        <div className={styles.notificationbox} style={{backgroundColor:color.background}}>
            {notifications.map(data=><NotificationCard
                key={data._id}
                topic={data.topic}
                date={data.date}
                text={data.text}
                price={data.price}
                trade={data.trade}
            />)}
        </div>
    )
}
