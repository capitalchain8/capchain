import React from 'react';
import styles from './Block.module.css'

export const Block = ({ data, result, from, to }) => {
    
    let computeSize = (data) => {
        if (data.toString().length < 5) {
            return '1.8rem'
        } else if (data.toString().length < 10) {
            return '1.5rem'
        } else if (data.toString().length < 15) {
            return '1rem'
        }
    }


    return (<div className={styles.conversionBlock} >
         <p style={{ fontSize: computeSize(data) }}>{!data ? 0 : data}{from}</p>
        <p style={{ fontSize: computeSize(data) }}>{!result ? 0 : result.toFixed(3)}{to}</p>
       
    </div>

    )
}