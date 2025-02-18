import React from 'react'
import styles from './desktopFooter.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const Desktopfooter = () => {

    let { user,color } = useSelector(state => state.userAuth)
    let navigate = useNavigate()

    let navigateHandler = (data)=>{
        navigate(`/${data}`)
    }




    return (
        <div className={styles.desktopfooter} style={{backgroundColor:color.background,borderTop:`1px solid ${color.normalText?color.normalText:'#fff'}`}}>

            <div className={styles.footermenu}>
                <ul>
                    <li onClick={()=>navigateHandler('home')}>Home</li>
                    <li onClick={()=>navigateHandler('learn')}>Careers</li>
                    <li onClick={()=>navigateHandler('privacy')}>Legal & Privacy</li>
                </ul>
                <p style={{color:color.normalText}}>© 2025 capchain</p>

            </div>

            <div className={styles.footerhelp}>
                <select style={{backgroundColor:color.fadeButtonColor,color:color.importantText}}>
                    <option >
                        English
                    </option>
                </select>

                

            </div>

        </div>
    )
}

export  default Desktopfooter