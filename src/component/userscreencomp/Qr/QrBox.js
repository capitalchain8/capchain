import React, { useEffect, useState } from 'react';
import styles from './QrBox.module.css';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { truncate } from './../../../utils/functions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const QrBox = () => {
    let { user,color } = useSelector(state => state.userAuth)
    let [walletAddress, setWalletAddress] = useState('')
    let timer 

    let navigate = useNavigate()
    let navigateHandler = () => {
        navigate(`/assets/select`)

    }

    let copyToClip = (e)=>{
        let button = document.querySelector('.button')
        button.style.backgroundColor = 'brown'

        timer = setTimeout(()=>{
            button.style.backgroundColor = '#1652f0'

        },1000)


    }

    useEffect(() => {
        let coinAddress = user.currentWallet.address
        setWalletAddress(coinAddress)
        return ()=>{
            clearTimeout(timer )
        }
    }, [])

  


    return (
        <div className={styles.QrBox} style={{backgroundColor:color.background}}>
            <div className={styles.selectorContainer}>
                <div className={styles.selectorOption} onClick={navigateHandler}>
                    <h1 style={{color:color.importantText}}>{user.currentWallet.id}</h1><span className="material-icons" style={{color:color.importantText}}>expand_more</span>
                </div>
                <p style={{color:color.normalText}}>{user.currentWallet.symbol}</p>

            </div>


            <div className={styles.QrContainer}>
                <div className={styles.Qr}>
                    <QRCode
                        size={256}
                        value={user.currentWallet.address}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>


            <div className={styles.QrAddressContainer} >
                <div className={styles.QrAddress}>
                    <div className={styles.address} >
                        <p style={{color:color.importantText}}>{user.currentWallet.symbol} addresss</p>
                        <h2 style={{color:color.normalText}}>{truncate(user.currentWallet.address, 12)}</h2>
                    </div>
                    <CopyToClipboard text={user.currentWallet.address}>
                        <button className='button' onClick={copyToClip}>copy</button>
                    </CopyToClipboard>


                </div>

                <div className={styles.warningContainer} style={{backgroundColor:color.fadeColor}}>
                    <span className="material-icons" style={{color:color.importantText,backgroundColor:color.fadeColor}}>priority_high</span>
                    <p style={{color:color.importantText}}>Only send {user.currentWallet.id} ({user.currentWallet.symbol}) to this address</p>
                </div>

            </div>

        </div>
    )
}

export default QrBox