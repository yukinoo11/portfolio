import React  from 'react'
import styles from './Hint.module.scss'
const Hint = ( props ) =>{
    const { text } = props;
    return(
        <>
        <div className={styles.hintWrap}>
            <div className={styles.hintInner}>
                <div className={ styles.content }>
                    <div className={styles.left}>
                        <span className = {styles.hintIcon}>해설</span>
                    </div>
                    <div className = {styles.hintText} >{text}</div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Hint;