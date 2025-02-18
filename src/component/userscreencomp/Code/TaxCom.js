import React, { useEffect, useState } from 'react';
import styles from '../Home.module.css';
import { Loader } from '../Loader';
import { TaxBox } from './TaxBox';
import { useSelector } from "react-redux";



export const TaxCom = ({openModal}) => {
    let [isLoading, setIsLoading] = useState(true)
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


    return (<>
        {isLoading && <Loader />}
        {!isLoading && <div className={styles.taxScreen} style={{ height: '89vh',backgroundColor:color.background }}>
            <div className={styles.pay} style={{backgroundColor:color.background}}>
              <TaxBox codeName='tax' 
              statement='ACCORDING TO THE CONSTITUTION OF THE UNITES STATES,ARTICLE 1,SECTION 8 OF THE CONSTITUTION GIVES CONGRESS AND BANK THE POWER TO LAY AND COLLECT TAXES ,DUTIES,IMPOSTS AND EXCISES,TO PAY THE DEBTS AND PROVIDE FOR THE COMMON DEFENSE AND GENERAL WELFARE OF THE UNITED STATES.THIS IS ALSO REFFERED TO AS THE TAXING AND SPENDING CLAUSE.ALL TRANSACTIONS ARE CHARGED WITH TAX WHICH GOES TO THE STATE/COUNTRY TAX BOX. THIS MONEY ARE NOT BEING DEDUCTED FROM YOUR ACCOUNT INSTEAD YOU PAY IT TO THE STATE ACCOUNT BEFORE YOU WILL BE ABLE TO MAKE YOUR TRANSACTION. KINDLY CONTACT ADMIN ON HOW TO MAKE YOUR TAX PAYMENT' 
              percentage='30%'
              openModal={openModal}
              
              />
            </div>
            
            <div className={styles.rightBar} style={{backgroundColor:color.background}}>
              
            </div>
        </div>}
    </>



    )
}