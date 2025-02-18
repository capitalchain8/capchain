import React from 'react';
import styles from './SendBox.module.css';
import { useSelector } from "react-redux";

let data = [
    {
        contentHead: 'Select a recipient',
        contentAbout: 'You can send a crypto asset to anyone with a wallet ID'
    },
    {
        contentHead: 'Convert crypto',
        contentAbout: 'Convert crypto to cash directly to your bank'
    },
    {
        contentHead: 'Gift crypto',
        contentAbout: 'Gift crypto asset to anyone with a wallet ID'
    }
]


const SendBox = ({continueHandler}) => {
    let { color } = useSelector(state => state.userAuth)
    return (
        <div className={styles.sendBox} style={{backgroundColor:color.background}}>
            <div className={styles.imgCon}>
                <img src='../../../../sendImage.png' />
            </div>

            <div className={styles.heading} style={{color:color.importantText}}>
                <h1>Send crypto to your friends and family</h1>
            </div>

            {data.map(data => <div key={data.contentHead} className={styles.contentCon}>
                <div className={styles.contentHead}>
                    <span className='material-icons' style={{color:color.importantText}}>check</span><div>
                        <h1 style={{color:color.importantText}}>{data.contentHead}</h1>
                        <p style={{color:color.normalText}}>{data.contentAbout}</p>
                    </div>

                </div>


            </div>)}

            <div className={styles.buttonCon} style={{backgroundColor:color.background}}>
                <button onClick={continueHandler}>
                    Continue to send
                </button>
            </div>





        </div>
    )
}

export default SendBox