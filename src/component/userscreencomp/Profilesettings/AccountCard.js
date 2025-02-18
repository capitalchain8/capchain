import React,{useState} from 'react';
import styles from './AccountCard.module.css';
import ListItem from './ListItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


let accountCardData = [
    {
        link:'limits',
        title:'Limits and features',
        icon:'chevron_right',
        type:'icon'
    },
    {
        link:'changeInfo',
        title:'Change Info',
        icon:'chevron_right',
        type:'icon'
    },
    {
        link:'privacy',
        title:'Privacy',
        icon:'chevron_right',
        type:'icon'
    },
    {
        link:'phonenumbers',
        title:'Phone Numbers',
        icon:'chevron_right',
        type:'icon'
    },
    {
        link:'closeAccount',
        title:'Close Account',
        icon:'chevron_right',
        type:'switch'
    },
]


export const AccountCard = ({openInfoModal,openCloseModal}) => {
  let [isSwitched, setIsSwitched] = useState(false)

  let { user,color } = useSelector(state => state.userAuth)
  let navigate = useNavigate()
  
  let navigateHandler = (data)=>{
    if(data === 'limits'){
      navigate('/limits')
    }else if(data === 'changeInfo'){
      openInfoModal()
    }else if(data === 'privacy'){
      navigate('/privacy')
    }else if(data === 'privacy'){
      navigate('/privacy')
    }else if(data === 'phonenumbers'){
      navigate('/changephone')
    }else if(data === 'closeAccount'){
    }
  }

  let switchHandler = (data)=>{
    if(data === 'closeAccount'){
      openCloseModal()
    }
    
  }


  return (
    <div className={styles.accountCard} style={{backgroundColor:color.background}}>
      <h1 style={{color:color.importantText}}>Account</h1>
      {accountCardData.map(data=><ListItem
      key={data.link} title={data.title} icon={data.icon} type={data.type} navigateHandler={navigateHandler} link={data.link} switchHandler={switchHandler} isSwitched={isSwitched}/>)}


    </div>
  )
}
