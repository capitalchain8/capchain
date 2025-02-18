import React from 'react';
import styles from './Balance.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


let actionData = [
    { icon: 'add', title: 'Buy',url:'assets/buy' },
    { icon: 'remove', title: 'Sell',url:'assets/sell' },
    { icon: 'arrow_upward', title: 'Send',url:'send' },
    { icon: 'autorenew', title: 'Convert',url:'assets/convert' },
    { icon: 'arrow_downward', title: 'Recieve',url:'Recieve' }
]



export const Balance = React.memo(({user}) => {
    let navigate = useNavigate()
     let { color } = useSelector(state => state.userAuth)


    const buttonHandler = (id)=>{
        let url = id.toLowerCase()
        navigate(`/${url}`)
    }


    return (
        <div className={styles.balance}  style={{backgroundColor:color.background}}>
            <h2  style={{color:color.importantText}}>Total balance</h2>
            <h1 style={{color:color.importantText}}>${Number(user.accountBalance).toFixed(2)}</h1>

            <div className={styles.balanceButtons}>

                {actionData.map(data => <div className={styles.balanceButton} key={data.icon}>
                    <button onClick={()=>buttonHandler(data.url)}><span className='material-icons'>{data.icon}</span></button>
                    <p style={{color:color.importantText}}>{data.title}</p>

                </div>)}

            </div>
        </div>


    )
})
