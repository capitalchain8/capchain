import React, { useEffect, useState } from 'react';
import styles from './InviteBox.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from "react-redux";

export const InviteBox = () => {
    let [shareLink, setShareLink] = useState('')
    let { color } = useSelector(state => state.userAuth)
    let timer


    let copyToClip = (e) => {
        let button = document.querySelector('.button')
        button.style.backgroundColor = 'brown'
        timer = setTimeout(() => {
            button.style.backgroundColor = '#1652f0'
        }, 1000)
    }

    useEffect(() => {
        setShareLink('https://www.capchains.cloud')
        return () => {
            clearTimeout(timer)
        }
    }, [])


    return (
        <div className={styles.invitebox} style={{backgroundColor:color.background}}>
            <h1 style={{color:color.importantText}}>Invite a friend to capchain and you'll both get $10.00</h1>

            <p style={{color:color.normalText}}>Know someone curious about crypto? You'll both receive $10 in Bitcoin when they buy or sell $100 or more on capchain</p>

            <input className={styles.emailinput}
                placeholder='Enter email address'
                style={{backgroundColor:color.fadeColor,color:color.importantText}} />

            <button className={styles.invitebutton} onClick={() => { }} style={{backgroundColor:color.fadeColor}}>
                Send Invites
            </button>

            <h3 className={styles.shareText} style={{color:color.normalText}}>Share the invite link</h3>



            <div className={styles.shareContainer}>
                <div className={styles.inputContainer} style={{backgroundColor:color.fadeColor}}>
                    <input value='https://www.capchains.cloud' style={{backgroundColor:color.fadeColor,color:color.importantText}} />
                </div>

                <CopyToClipboard text={shareLink}>
                    <button onClick={copyToClip} className='button'>
                        
                        copy
                    </button>
                </CopyToClipboard>





            </div>

        </div>
    )
}
