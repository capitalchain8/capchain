import React from 'react';
import styles from './feature.module.css';
import { useSelector } from "react-redux";

export const Features = () => {
    let { user,color } = useSelector(state => state.userAuth)

    let featureData = [
        {
            icon:'credit_card',
            featureName:'3D Secure purchases',
            featureContent:'$40/week'
        },
        {
            icon:'send',
            featureName:'Send cryptocurrency',
            featureContent:'Enabled'
        },
        {
            icon:'qr_code',
            featureName:'Recieve cryptocurrency',
            featureContent:'Enabled'
        }

    ]



  return (
    <div className={styles.feature} style={{backgroundColor:color.background}}>
        
        {featureData.map(data=><div className={styles.featureCard} key={data.icon}>
            <span className='material-icons' style={{color:color.importantText}} >
                {data.icon}
            </span>
            <p className={styles.featureName} style={{color:color.normalText}}>
                {data.featureName}
            </p>
            <p className={styles.featureContent} style={{color:color.normalText}}>
            {data.featureContent}
            </p>

        </div>)}

    </div>
  )
}
