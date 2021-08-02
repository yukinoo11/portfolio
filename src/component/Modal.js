import React from 'react'
import styles from './Modal.module.css';


const Modal = ( props ) => {

    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open , close , modalType } = props;
    const styleName = modalType === undefined ? 'box' : modalType;

    return(
        <div className = { open ? `${styles['openModal']} ${styles['modal']}` : styles.modal }>
            { open ? (
                <section>
                    <div className = {styles[`${styleName}`]}>
                        { styleName === 'box' ? (
                            <header>
                                <button className= { styles.close } onClick={ close }>&times;</button>
                            </header>
                        ) : null} 
                        <main>
                            { props.children }
                        </main>
                    </div>
                </section>
            ) : null }

        </div>
    )
}

export default Modal;