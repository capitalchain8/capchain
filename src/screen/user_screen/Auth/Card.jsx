import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import AuthNav from '../../../component/common/AuthNav';


function Card() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')

    let { id } = useParams()


    //initialise router
    let navigate = useNavigate()

    //method to close handler
    const closeModal = () => {
        setIsError(false)
    }

    useEffect(() => {
        if (!id) {
            navigate('/signup')
        }
    })

    let cardHandler = ()=>{
        navigate(`/add-card/${id}`)
    }

    let skipHandler = ()=>{
        //navigate to home
        navigate('/home')
    }




    return (<>
        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />

        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.imageContainer} >
                    <img src='../../../card.png' />
                </div>

                <p className={styles.paragraphText}>Now let's add a bank card to your account so you can buy some crypto.</p>
                

                <button className={styles.setup} onClick={cardHandler}>
                    set up bank card

                </button>

                <button className={styles.skip} onClick={skipHandler}>
                    skip
                </button>


            </div>

        </div >



    </>

    );
}

export default Card;