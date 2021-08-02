import React, { useEffect, useRef } from 'react'
import styles from './SliderFilter.module.scss';
import { Link } from "react-router-dom";
const URL = '/shots/gallery';

const SliderFilter = ( props ) => {
    const { list, category } = props;
    const scrollRef = useRef();
    useEffect(()=>{
        // clean up function
        return () => {
        }
    },[]);

    const renderer = list.map(( item, index) => {
        return(
            <li key={index} >
                <span className = { category === item.url ? styles.active : null }>
                    { category === item.url ? (
                        item.label
                    ) : (
                        <Link to={`${URL}/${item.url}`}>{item.label}</Link>
                    )}
                </span>
            </li>
        )
    });

    const onClickPrevBtn = () => {
        scroll( -1 );
    }

    const onClickNextBtn = () => {
        scroll( 1 );
    }

    const scroll = ( direction ) => {
        const far = scrollRef.current.scrollWidth / 3 * direction;
        const pos = scrollRef.current.scrollLeft + far;
        scrollRef.current.scrollTo(pos, 0);
    }

    return (
        <div className= {styles.category}>
            <span className={styles.page} onClick={ onClickPrevBtn } >
                <img src='/svg/arrow_back_ios_black_24dp.svg' alt='back' />
            </span>
            <ul ref={scrollRef}>
                { renderer }
            </ul>
            <span className={styles.page} onClick={ onClickNextBtn } >
                <img src='/svg/arrow_forward_ios_black_24dp.svg' alt='forward'/>
            </span>
        </div>
    )
}

export default SliderFilter;