import React, { useState, useCallback, useEffect } from 'react';
import styles from './PhoneSignup.module.css';
import { cancelRegisteration, phoneSignup } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../../component/Modal/LoadingModal";
import Modal from "../../../component/Modal/Modal";
import SignoutModal from "../../../component/Modal/Signout";
//import routers
import { useNavigate, useParams } from 'react-router-dom';
import SubmitBtn from "../../../component/common/Submit";
import AuthNav from '../../../component/common/AuthNav';


function PhoneSignup() {
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isSignout, setIsSignout] = useState(false)
    let [phone, setPhone] = useState("")
    let [phoneError, setPhoneError] = useState("")
    let [isPhoneError, setIsPhoneError] = useState("")
    let [country, setCountry] = useState("Afghanistan")

    let { id } = useParams()

    //initialising reduzx
    let dispatch = useDispatch()

    //initialise router
    let navigate = useNavigate()

    //method to close handler
    const closeModal = () => {
        setIsError(false)
        setIsSignout(false)
    }

    useEffect(() => {
        if (!id) {
            navigate('/signup')
        }
    },[])




    //this handler check if user email has been verified
    const submitHandler = async (e) => {
        e.preventDefault()
        if (isPhoneError || !phone || !country) {
            return
        }
        //navigating to verifyPhone for testing purpose
        setIsLoading(true)
        //proceed to send sms code
        setIsError(false)
        setIsSignout(false)
        setIsErrorInfo('')
        let res = await dispatch(phoneSignup({ email: id, phone, country }))

        if (!res.bool) {
            setIsError(false)
            setIsErrorInfo(res.message)
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        //do something with the returning data
        navigate(`/verifyPhone/${id}/${phone}`)
    }



    let signoutHandler = () => {
        setIsError(false)
        setIsSignout(true)
    }



    let cancelAuthProgress = async () => {
        setIsError(false)
        setIsSignout(false)
        setIsErrorInfo('')
        let res = await dispatch(cancelRegisteration({ email: id }))

        if (!res.bool) {
            setIsError(true)
            setIsErrorInfo(res.message)
            return
        }
        navigate('/signup')

    }

    let changePhoneHandler = (e) => {
        let data = e.target.value
        setPhone(e.target.value)

        if (data.length === 0) {
            setPhoneError("field should not be empty")
            setIsPhoneError(true)
        }
        else if (data.length <= 2) {
            setPhoneError("characters size too small")
            setIsPhoneError(true)
        }
        else if (!data.match(/[0-9.]/g)) {
            setPhoneError("number is not valid")
            setIsPhoneError(true)
        }
        else {
            setPhoneError("")
            setIsPhoneError(false)
        }
    }


    let changeCountryHandler = (e) => {
        setCountry(e.target.value)

    }




    return (<>
        {isSignout && <SignoutModal closeModal={closeModal} cancelAuthProgress={cancelAuthProgress} />}

        {isLoading && <LoadingModal />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

        <AuthNav />


        <div className={styles.screenContainer}>
            <div className={styles.innerContainer}>

                <h1 className={styles.headText}>Setup two-step verification</h1>

                <p className={styles.paragraphText}>Please enter the mobile number associated with your device. We’ll text a verification code to your mobile phone when you sign in. </p>

                <form onSubmit={submitHandler}>

                    <div className={styles.inputContainer}>
                        <div>
                            <label>Country</label>

                            <select onChange={changeCountryHandler}
                                value={country}>
                                <option >Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                                <option>American Samoa</option>
                                <option>Andorra</option>
                                <option>Angola</option>
                                <option>Anguilla</option>
                                <option>Antarctica</option>
                                <option>Antigua and Barbuda</option>
                                <option>Argentina</option>
                                <option>Armenia</option>
                                <option>Aruba</option>
                                <option>Australia</option>
                                <option>Azerbaijan</option>
                                <option>Bahamas</option>
                                <option>Bahrain</option>
                                <option>Bangladesh</option>
                                <option>Barbados</option>
                                <option>Belarus</option>
                                <option>Belgium</option>
                                <option>Belize</option>
                                <option>Benin</option>
                                <option>Bermuda</option>
                                <option>Bhutan</option>
                                <option>Bolivia</option>
                                <option>Bonaire, Sint Eustatius and Saba </option>
                                <option>Bosnia and Herzegovina</option>
                                <option>Botswana</option>
                                <option>Bouvet Island</option>
                                <option>Brazil</option>
                                <option>British Indian Ocean Territory</option>
                                <option>Brunei Darussalam</option>
                                <option>Bulgaria</option>
                                <option>Burkina Faso</option>
                                <option>Burundi</option>
                                <option>Cambodia</option>
                                <option>Cameroon</option>
                                <option>Canada</option>
                                <option>Cape Verde</option>
                                <option>Cayman Islands</option>

                                <option>Central African Republic</option>
                                <option>Chad</option>
                                <option>Chile</option>
                                <option>China</option>
                                <option>Christmas Island</option>
                                <option>Cocos Islands</option>
                                <option>Colombia</option>
                                <option>Comoros</option>
                                <option>Congo</option>
                                <option>Congo,The Democratic Republic Of The</option>
                                <option>Cook Islands</option>
                                <option>Costa Rica</option>
                                <option>Croatia</option>
                                <option>Cuba</option>
                                <option>Curacao</option>
                                <option>Cyprus</option>
                                <option>Czech Republic</option>
                                <option>Cote D'Ivoire</option>
                                <option>Denmark</option>
                                <option>Djibouti</option>
                                <option>Dominica</option>
                                <option>Dominican Republic</option>
                                <option>Ecuador</option>
                                <option>Egypt</option>
                                <option>El Salvador</option>
                                <option>Equatorial Guinea</option>
                                <option>Eritrea</option>
                                <option>Estonia</option>
                                <option>Ethiopia</option>
                                <option>Falkland Islands</option>
                                <option>Faroe Islands</option>
                                <option>Fiji</option>
                                <option>Finland</option>
                                <option>France</option>
                                <option>French Guiana</option>
                                <option>French Polynesia</option>
                                <option>French Southern Territories</option>
                                <option>Gabon</option>
                                <option>Gambia</option>
                                <option>Georgia</option>
                                <option>Germany</option>
                                <option>Ghana</option>
                                <option>Gibraltar</option>
                                <option>Greece</option>
                                <option>Greenland</option>
                                <option>Greenada</option>
                                <option>Guadeloupe</option>
                                <option>Guam</option>
                                <option>Guatemala</option>
                                <option>Guernsey</option>
                                <option>Guinea</option>
                                <option>Guinea Bissau</option>
                                <option>Guyana</option>
                                <option>Haiti</option>
                                <option>Heard and McDonald Islands</option>
                                <option>Holy See</option>
                                <option>Honduras</option>
                                <option>Hong Kong</option>
                                <option>Hungary</option>
                                <option>Iceland</option>
                                <option>India</option>
                                <option>Indonesia</option>
                                <option>Iran,Islamic Republic Of</option>
                                <option>Iraq</option>
                                <option>Ireland</option>
                                <option>Isle of Man</option>
                                <option>Isreal</option>
                                <option>Italy</option>
                                <option>Jamaica</option>
                                <option>Japan</option>
                                <option>Jersey</option>
                                <option>Jordan</option>
                                <option>Kazakhstan</option>
                                <option>Kenya</option>
                                <option>Kiribati</option>
                                <option>Korea,Democratic People's Republic of </option>
                                <option>Korea,Republic of </option>
                                <option>Kuwait</option>
                                <option>Kyrgyzstan</option>
                                <option>Lao People's Democratic  Republic  </option>
                                <option>Latvia</option>
                                <option>Lebanon</option>
                                <option>Lesotho</option>
                                <option>Liberia</option>
                                <option>Libya</option>
                                <option>Liechtenstein</option>
                                <option>Lithuania</option>
                                <option>Luxembourg</option>
                                <option>Macao</option>
                                <option>Madagascar</option>
                                <option>Malawi</option>
                                <option>MalaySia</option>
                                <option>Maldives</option>
                                <option>Mali</option>
                                <option>Malta</option>
                                <option>Marshall Islands</option>
                                <option>Martinique</option>
                                <option>Mauritania</option>
                                <option>Mauritius</option>
                                <option>Mayotte</option>
                                <option>Mexico</option>
                                <option>Micronesia,Federated States Of</option>
                                <option>Moldova, Republic of</option>
                                <option>Monaco</option>
                                <option>Mongolia</option>
                                <option>Montenegro</option>
                                <option>Montserrat</option>
                                <option>Morocco</option>
                                <option>Mozambique</option>
                                <option>Myanmar</option>
                                <option>Namibia</option>
                                <option>Nauru</option>
                                <option>Nepal</option>
                                <option>Netherlands</option>
                                <option>Netherlands Antilles</option>
                                <option>New Caledonia</option>
                                <option>New Zealand</option>
                                <option>Nicaragua</option>
                                <option>Niger</option>
                                <option>Nigeria</option>
                                <option>Niue</option>
                                <option>Norfolk Island</option>
                                <option>North Macedonia, Republic of</option>
                                <option>Northern Mariana Islands</option>
                                <option>Norway</option>
                                <option>Oman</option>
                                <option>Pakistan</option>
                                <option>Palau</option>
                                <option>Palestine,State of</option>
                                <option>Panama</option>
                                <option>Papua New Guinea</option>
                                <option>Paraguay</option>
                                <option>Peru</option>
                                <option>Philippines</option>
                                <option>Pitcairn</option>
                                <option>Poland</option>
                                <option>Portugal</option>
                                <option>Puerto Rico</option>
                                <option>Qatar</option>
                                <option>Romania</option>
                                <option>Russian Federation</option>
                                <option>Rwanda</option>
                                <option>Reunion</option>
                                <option>Saint Barthelemy</option>
                                <option>Saint Helena</option>
                                <option>Saint Kitts And Nevis</option>
                                <option>Saint Lucia</option>
                                <option>Saint Martin</option>
                                <option>Saint Pierre And Miquelon</option>
                                <option>Saint Vincent And The Grenedines</option>
                                <option>Samoa</option>
                                <option>San Marino</option>
                                <option>Sao Tome and Principe</option>
                                <option>Saudi Arabia</option>
                                <option>Senegal</option>
                                <option>Serbia</option>
                                <option>Seychelles</option>
                                <option>Seirra Leone</option>
                                <option>Singapore</option>
                                <option>Sint Maarten</option>
                                <option>Slovakia</option>
                                <option>Solomon Islands</option>
                                <option>Somalia</option>
                                <option>South Africa</option>
                                <option>South Georgia and the south Sandwich Islands</option>
                                <option>South Sudan</option>
                                <option>Spain</option>
                                <option>Sri Lanka</option>
                                <option>Sudan</option>
                                <option>Suriname</option>
                                <option>Svalbard And Jan Mayen</option>
                                <option>Swiziland</option>
                                <option>Sweden</option>
                                <option>Switzerland</option>
                                <option>Syrian Arab Republic</option>
                                <option>Taiwan,Republic Of China</option>
                                <option>Tajikistan</option>
                                <option>Tanzania </option>
                                <option>Thailand</option>
                                <option>Timor-Leste</option>
                                <option>Togo</option>
                                <option>Tokelau</option>
                                <option>Tonga</option>
                                <option>Trinidad and Tobago</option>
                                <option>Tunisia</option>
                                <option>Turkey</option>
                                <option>Turkmenistan</option>
                                <option> Turks and Caicos Islands</option>
                                <option>Tuvalu</option>
                                <option>Uganda</option>
                                <option>Ukraine</option>
                                <option>United Arab Emirates</option>
                                <option>United Kingdom</option>
                                <option>United States</option>
                                <option>United States Minor Outlying Islands</option>
                                <option>Uruguay</option>
                                <option>Uzbekistan</option>
                                <option>Vanuatu</option>
                                <option>Venezuela, Bolivarian Republic</option>
                                <option>Veitnam</option>
                                <option>Virgin Islands, British</option>
                                <option>Virgin Islands, U.S.</option>
                                <option>Wallis and Futuna</option>
                                <option> Western Sahara</option>
                                <option>Yemen</option>
                                <option>Zambia</option>
                                <option>Zimbabwe</option>
                                <option>Aland Islands</option>

                            </select>

                        </div>

                        <div>
                            <label>Mobile number</label>
                            <input onChange={changePhoneHandler}
                                value={phone}
                                required={true}
                                />
                            <p className={styles.phoneerror}>{phoneError}</p>
                        </div>
                    </div>

                    <div className={styles.securityContainer}>
                        <div className={styles.imgContainer}>
                            <img src='../../../phone_image (2).png' />

                        </div>
                        <div className={styles.textContainer}>
                            <p>
                                Security is critical at capchain. To help keep your account safe, we’ll text you a verification code when you sign in on a new device.
                            </p>

                        </div>


                    </div>

                    <SubmitBtn text='Send code' style={{ color: '#fff' }} />

                </form>




            </div>
            <p className={styles.signout} onClick={signoutHandler}>Sign out</p>
        </div>



    </>

    );
}

export default PhoneSignup;