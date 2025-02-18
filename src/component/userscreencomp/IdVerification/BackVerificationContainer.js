import React, { useState, useEffect } from 'react';
import styles from './VerificationContainer.module.css';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import Modal from '../../Modal/Modal';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uploadBackId } from "../../../store/action/userAppStorage";
import ReactS3 from 'react-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;
const imageMimeType = /image\/(png|jpg|jpeg)/i;


export const BackVerificationContainer = () => {
    let [file, setFile] = useState(false)
    const [fileDataURL, setFileDataURL] = useState(null);
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let { user, color } = useSelector(state => state.userAuth)


    const changePhotoHandler = (e) => {

        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);


    }
    const uploadHandler = async () => {
        setIsLoading(true)
        let imgUrl

        try {
            let upload = async () => {
                const config = {
                    dirName: process.env.REACT_APP_DIRNAME,
                    bucketName: process.env.REACT_APP_BUCKETNAME,
                    region: process.env.REACT_APP_REGION,
                    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
                    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
                }

                return ReactS3.uploadFile(file, config).then(response => {
                    console.log(response)
                    if (response.result.status !== 204)
                        throw new Error("Failed to upload image to S3");
                    else {

                        imgUrl = (response.location)
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
            await upload()

        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(err.message)
            return
        }

        let data = {
            user: user,
            imageUrl: imgUrl
        }

        let res = await dispatch(uploadBackId(data))
        setIsLoading(false)

        if (!res.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(res.message)
            return
        }
        setIsLoading(false)
        //navigate to camera 2
        navigate('/home')
    }
    const retryHandler = () => {
        setFile(false)
        setFileDataURL(null)

    }
    const closeModal = () => {
        setIsError(false)
        setIsErrorInfo('')

    }
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    if (isLoading) {
        return <Loader />
    }


    return (<>
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
        {file ? <div className={styles.verificationContainer} style={{ backgroundColor: color.background }}>

            <div className={styles.previewContainer} style={{ backgroundColor: color.background }}>
                <img src={fileDataURL} className={styles.preview} />
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={uploadHandler}>upload</button>
                <button onClick={retryHandler} style={{ backgroundColor: color.fadeColor, color: color.importantText }}>try again</button>
            </div>

        </div> :
            <div className={styles.verificationContainer} style={{ backgroundColor: color.background }}>
                <div className={styles.imgContainer}>
                    <img src='../../contact_1.png' />
                </div>

                <h1 className={styles.headText} style={{ color: color.importantText }}>Back IDverification</h1>

                <p className={styles.text} style={{ color: color.normalText }}>Please upload a photo of the back section of your driver license!</p>

                <div className={styles.buttonContainer} >
                    <input type='file' onChange={changePhotoHandler} style={{ backgroundColor: color.fadeColor }} />
                </div>

            </div>
        }

    </>
    )
}