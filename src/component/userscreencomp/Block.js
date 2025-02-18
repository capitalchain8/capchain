import React from 'react';
import styles from './Block.module.css'

export const Block = ({ data, result, priceFormat,symbol }) => {


    let computeSize = (result) => {
        if (result.toString().length < 5) {
            return '1.7rem'
        } else if (result.toString().length < 10) {
            return '1.4rem'
        } else if (result.toString().length < 15) {
            return '1rem'
        }
    }


    return (<>{priceFormat ? <div className={styles.conversionBlock} >
        <p style={{ fontSize: computeSize(data) }}>${!data ? 0 : data}</p>
        <p style={{ fontSize: computeSize(data) }}>{!result ? 0 : result}{symbol}</p>
    </div> : <div className={styles.conversionBlock} >
        <p style={{ fontSize: computeSize(data) }}>{!data ? 0 : data}{symbol}</p>
        <p style={{ fontSize: computeSize(data) }}>${!result ? 0 : result}</p>
    </div>}</>

    )
}
