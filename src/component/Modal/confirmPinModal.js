import React, { useState } from 'react';
import styles from './Modal.module.css';
import { useDispatch } from "react-redux";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { secureAccount } from './../../store/action/userAppStorage';
import { useSelector } from 'react-redux';


let ConfirmPinModal = ({ closeModal, pin }) => {
    let [isValue, setIsValue] = useState('')
    let [isError, setIsError] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    let { user,color } = useSelector(state => state.userAuth)


    let navigateHandler = async(data) => {
        if (isValue !== pin) {
            setIsError(true)
            return
        }
        setIsLoading(true)
        setIsError(false)
        //api to create new pin
        let res = await dispatch(secureAccount(isValue))

        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            return
        }
        return closeModal()

    }

  
    let buttonClick = (num) => {
        setIsValue(prev => {
            if (prev.length > 3) {
                return prev
            }
            return prev + num
        })
    }


    let handleDelete = () => {
        //get the value string and remove the last element
        setIsValue(prev => prev.slice(0, -1))
    }

    let dot = () => {
        setIsValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    let dataUi = (data) => {
        data = data.toString()

        //convert string to an array
        let arr = []
        for (let m of data) {
            arr.push(m)
        }
        return <div className={styles.dataContainer}>
            <p style={{color:color.importantText,backgroundColor:color.fadeColor}}>{arr[0] ? <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>emergency</span> : <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>radio_button_unchecked</span>}</p>

            <p style={{color:color.importantText,backgroundColor:color.fadeColor}}>{arr[1] ? <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>emergency</span> : <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>radio_button_unchecked</span>}</p>

            <p style={{color:color.importantText,backgroundColor:color.fadeColor}}>{arr[2] ? <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>emergency</span> : <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>radio_button_unchecked</span>}</p>

            <p style={{color:color.importantText,backgroundColor:color.fadeColor}}>{arr[3] ? <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>emergency</span> : <span className='material-icons' style={{color:color.importantText,backgroundColor:color.fadeColor}}>radio_button_unchecked</span>}</p>

        </div>
    }


    return <div className={styles.pinmodal_screen}>
        <div className={styles.modal_con}>


            <div className={styles.buy_modal} style={{backgroundColor:color.fadeColor}}>
                <div className={styles.header}>
                    <span className='material-icons' onClick={() => closeModal()} style={{color:color.importantText}}>close</span>
                    {isError ? <p style={{ color: 'red' }}>pin doesn't match</p> : <p style={{color:color.importantText}}>Confirm pin</p>}
                </div>


                <div className={styles.resultContainer}>
                    {dataUi(isValue)}
                </div>

                <div className={styles.buttonContainer}>
                    <span onClick={()=>buttonClick('1')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>1</span>
                    <span onClick={()=>buttonClick('2')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}} >2</span>
                    <span onClick={()=>buttonClick('3')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>3</span>
                    <span onClick={()=>buttonClick('4')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>4</span>
                    <span onClick={()=>buttonClick('5')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>5</span>
                    <span onClick={()=>buttonClick('6')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>6</span>
                    <span onClick={()=>buttonClick('7')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>7</span>
                    <span onClick={()=>buttonClick('8')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>8</span>
                    <span onClick={()=>buttonClick('9')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>9</span>
                    <span onClick={()=>buttonClick('0')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>0</span>
                    <span onClick={()=>dot('.')} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>.</span>
                    <div className='material-icons' onClick={()=>handleDelete()} style={{color:color.importantText,backgroundColor:color.fadeColor,fontSize:'1.3rem'}}>arrow_back</div>
                </div>





                <div className={styles.buy_con}>
                    <button onClick={() => navigateHandler()}>{isLoading ?
                        <Spinner size={15} color={'#fff'} speed={.5} /> : 'create pin'}</button>


                </div>


            </div>

        </div>

    </div>
}

export default ConfirmPinModal