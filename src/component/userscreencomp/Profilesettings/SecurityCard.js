import React,{useState} from 'react';
import styles from './AccountCard.module.css';
import ListItem from './ListItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { offPinSwitch, onPinSwitch } from './../../../store/action/userAppStorage';


let accountCardData = [
    {
        link:'requirepin',
        title:'Require pin',
        icon:'chevron_right',
        type:'switch'
    },
    {
      link:'setpin',
      title:'Pin settings',
      icon:'chevron_right',
      type:'icon'
  },
  {
    link:'support',
    title:'Support',
    icon:'chevron_right',
    type:'icon'
},
   

]

export const SecurityCard = ({openPasswordModal,openPinModal}) => {
  let { user,color } = useSelector(state => state.userAuth)
  let [isSwitched, setIsSwitched] = useState(user.isRequiredPin)

  
  let navigate = useNavigate()
  const dispatch = useDispatch()

  let navigateHandler = (data)=>{
    if(data === 'setpin'){
      navigate(`/${data}`)
    }else if(data === 'support'){

      navigate(`/${data}`)
    } 
  }
 
  let switchHandler = async(data)=>{
    if(data === 'requirepin'){
      if (!user.pin) {
        if (!isSwitched) {
          return openPasswordModal()
        }
        return
      }
      if (!isSwitched) {
        let res = await dispatch(onPinSwitch())
        if (!res.bool) {
          setIsSwitched(false)
          return
        }
        setIsSwitched(true)
        return
      } else {
        let res = await dispatch(offPinSwitch())
        if (!res.bool) {
          setIsSwitched(true)
          return
        }
        setIsSwitched(false)
        return
      }
  
    }
  }


  return (
    <div className={styles.accountCard} style={{backgroundColor:color.background}}>
      <h1 style={{color:color.importantText}}>Security</h1>

      {accountCardData.map(data=><ListItem
      key={data.link} title={data.title} icon={data.icon} type={data.type} navigateHandler={navigateHandler} link={data.link} switchHandler={switchHandler} isSwitched={isSwitched}/>)}

      
    </div>
  )
}