import React,{useState,useEffect} from 'react';
import styles from '../Home.module.css';
import { Reoccuring } from './Reoccuring';
import { Balance } from './Balance';
import { MyAssets } from './MyAssets';
import { Loader } from '../HomeLoader';
import { useSelector } from "react-redux";


export const AssetComponent = () => {
  let [isLoading,setIsLoading] = useState(true)
  let { color } = useSelector(state => state.userAuth)
  


  useEffect(()=>{
    let timer = setTimeout(()=>{
      setIsLoading(false)
    },3000)
    return ()=>{
      clearTimeout(timer)
    }

  },[])



  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.assetScreen} style={{backgroundColor:color.background}}>

      <div className={styles.timeline}>
        <Balance/>

        <MyAssets/>

        <div className={styles.reoccuringMobile}>
          <Reoccuring />
        </div>

      </div>



      <div className={styles.rightBars}>


      <div className={styles.reoccuringDesktop}>
          <Reoccuring />
        </div>

      </div>

    </div >


  )
}
