import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styles from './Navigation.module.scss';

export const Navigation = ( props ) => {
    const { match } = props;
    const [ toggle, setToggle ] = useState(false);
    useEffect(() => {
        //clean up Function
        return () => {
            setToggle(false);
        }
    }, [ match ]);

    const handleClick = () => {
        setToggle(prevToggle => !prevToggle);
    }

    return (
        <>
            <div className={styles.topNavigation}>
                <div className={styles.container}>
                    <button onClick={ handleClick }>
                        {toggle ? (
                            <img src='/svg/close_black_24dp.svg' className={styles.prevIcon} alt='prev' />
                        ) : (
                            <img src='/svg/menu_black_24dp.svg' className={styles.prevIcon} alt='prev' />
                        )}
                    </button>
                </div>
                <div className={styles.logo}>
                    <Link to='/'><img src='/images/Logo.png' alt='logo' /></Link>
                </div>
            </div>
            <div>
                { toggle ? (
                    <MobileMenu>
                        { props.children }
                    </MobileMenu>
                ) : (null) }
            </div>
        </>
    )
}

const MobileMenu = (props) => {
    return (
        <div className={styles.MobileMenuContainer}>
            <div className={styles.inner}>
                {props.children}
            </div>
        </div>
    )
}

export default Navigation;