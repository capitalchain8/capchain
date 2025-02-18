import React from 'react';
import styles from './TimelineCard.module.css';
import { useSelector } from "react-redux";


export const TimelineCard = React.memo(({ data,onClick }) => {
  let { color } = useSelector(state => state.userAuth)

  return (<div className={styles.timelineCards} onClick={()=>{
    onClick(data.browserUrl)
  }} style={{backgroundColor:color.background}}>


    <div className={styles.timelineCardleft}>
      <div className={styles.timelineImg}>
        <div className={styles.heading}>
          <div className={styles.headingTextCon}>
            <span className='material-icons'>
              question_mark
            </span>
            <div className={styles.headingText}>
              <p style={{color:color.importantText}}>{data.title}</p>
              <p style={{color:color.normalText}}>{data.action}</p>
            </div>

          </div>

          <div className={styles.headingIcon}>
            <span className='material-icons' style={{color:color.importantText}}>
              more_vert
            </span>

          </div>

        </div>

        <img src={data.url} />

      </div>

      <div className={styles.timelineAbout}>

        <div className={styles.heading}>
          <div className={styles.headingTextCon}>
            <span className='material-icons'>
              question_mark
            </span>
            <div className={styles.headingText}>
              <p>{data.title}</p>
              <p>{data.action}</p>
            </div>

          </div>

          <div className={styles.headingIcon}>
            <span className='material-icons'>
              more_vert
            </span>

          </div>

        </div>

        <h1 className={styles.aboutHead}>{data.topic}</h1>
        <p className={styles.aboutText}>{data.about}</p>

        <div className={styles.aboutIconContainer}>
          <span className='material-icons' style={{color:color.importantText}}>
            favorite_outline
          </span>

          <p style={{color:color.importantText}}>
            {data.likeNo}
          </p>

          <span className='material-icons' style={{color:color.importantText}}>
            share
          </span>

        </div>









      </div>


    </div>

    <div className={styles.timelineCardright}>
      <div className={styles.heading}>
        <div className={styles.headingTextCon}>
          <span className='material-icons'>
            question_mark
          </span>
          <div className={styles.headingText}>
            <p style={{color:color.importantText}}>capchain Learn</p>
            <p style={{color:color.normalText}}>Explainers</p>
          </div>

        </div>

        <div className={styles.headingIcon}>
          <span className='material-icons' style={{color:color.importantText}}>
            more_vert
          </span>

        </div>

      </div>


      <div className={styles.timelineAbout}>

        <h1 className={styles.aboutHead} style={{color:color.importantText}}>{data.topic}</h1>
        <p className={styles.aboutText} style={{color:color.normalText}}>{data.about}</p>

        <div className={styles.aboutIconContainer}>
          <span className='material-icons' style={{color:color.importantText}}>
            favorite_outline
          </span>

          <p style={{color:color.importantText}}>
            {data.likeNo}
          </p>

          <span className='material-icons' style={{color:color.importantText}}>
            share
          </span>

        </div>









      </div>
      <div>

      </div>
      <div>

      </div>

    </div>



  </div>


  )
})