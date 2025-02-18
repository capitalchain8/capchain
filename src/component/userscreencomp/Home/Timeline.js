import React from 'react';
import styles from './Timeline.module.css';
import { TimelineCard } from './TimelineCard';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from "react-redux";




export const Timeline = React.memo(({ timeline }) => {
  let navigate = useNavigate()
  let { color } = useSelector(state => state.userAuth)

  let navigateHandler = (data) => {
    navigate(data)
  }


  return (<div className={styles.timelineCon} style={{backgroundColor:color.background}}>
    {timeline.map(data => <TimelineCard key={data.about} data={data} onClick={navigateHandler} />)}

    <div className={styles.loaderCon}>

      <div className={styles.imgLoader}>
        <div className={styles.imgTop}>
          <Skeleton style={{
            height: '15px',
            width: '50%',
            
      
          }}
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}
           />
          <Skeleton style={{
            height: '25px',
            width: '80%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

        </div>


        <div className={styles.img}>
          <Skeleton style={{
            height: '100%',
            width: '100%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>
        </div>


        <div className={styles.imgBottom}>


          
          <Skeleton style={{
            height: '20px',
            width: '90%',
          }}
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`} />

          <Skeleton style={{
            height: '20px',
            width: '100%',
          }}
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`} />

        </div>



      </div>

      <div className={styles.idLoader}>
        <div>
          <Skeleton style={{
            height: '25px',
            width: '70%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

        </div>


        <div>


          <Skeleton style={{
            height: '15px',
            width: '70%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

          <Skeleton style={{
            height: '20px',
            width: '90%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

          <Skeleton style={{
            height: '70px',
            width: '100%',
          }} 
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

        </div>

        <div>
          <Skeleton style={{
            height: '20px',
            width: '40%',
          }} 
          
          baseColor = {`${color.fadeColor}`}
          highlightColor={`${color.normalText}`}/>

        </div>



      </div>
    </div>


  </div>


  )
})
