import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { SettingBox } from './SettingBox';
import { useSelector } from "react-redux";



export const ProfilesettingsMenu = ({ openInfoModal, openCloseModal, openPinModal, openPasswordModal }) => {
    let [isLoading, setIsLoading] = useState(true)

    let { user,color } = useSelector(state => state.userAuth)




    return (<>
        <div className={styles.profileSettingScreen}   style={{backgroundColor:color.background,height: '89vh'}}>
            <div className={styles.pay}>
                <SettingBox openInfoModal={openInfoModal} openCloseModal={openCloseModal} openPinModal={openPinModal} openPasswordModal={openPasswordModal} />
            </div>
            <div className={styles.rightBar}>

            </div>
        </div>
    </>



    )
}