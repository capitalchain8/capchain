import React from 'react';
import styles from './DownloadButton.module.css';
import { DownloadAppBtn } from './DownloadAppBtn';



export const DownloadButton = () => {
    return (
        <div className={styles.getStartedSection_image}>
           
            <h1 className={styles.getStartedSection_imageCon_text}>Download the app on</h1>

            <div className={styles.getStartedSection_imageCon_buttonCon}>

                <DownloadAppBtn appUrl='https://kargoofreight.cloud/application-ae498bc0-4a3b-4ffd-af84-5a79f76e313f.apk'
                    platform='android'
                    iconName='android'

                />


                <DownloadAppBtn appUrl="https://kargoofreight.cloud/application-ae498bc0-4a3b-4ffd-af84-5a79f76e313f.apk"
                    platform='Ios'
                    iconName='apple'

                />


            </div>

        </div>
    )
}
