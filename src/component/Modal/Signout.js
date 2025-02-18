import React from 'react'
import styles from './Signout.module.css'

let Modal = ({closeModal,cancelAuthProgress }) => {
    return <div className={styles.modal_screen}>
        <div className={styles.modal_center}>
            <div className={styles.modal}>

                <img src='../../contact_1.png' />

                <h1>Are you sure you wanna start over</h1>

                <p>you will loose any progress that you've made.</p>

                <button className={styles.modal_button} onClick={cancelAuthProgress}>
                    Yes,i'm sure
                </button>

                <button className={styles.modal_button}  onClick={closeModal}>
                    Cancel
                </button>




            </div>

        </div>

    </div>
}

export default Modal