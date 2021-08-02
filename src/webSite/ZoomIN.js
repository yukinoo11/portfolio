import React, { useEffect, useRef, useState } from 'react'
import { ThumbnailList } from './View';
import styles from './ZoomIN.module.scss';

const ZoomIN = (props) => {
    const { title, list, index, handleClick } = props;
    const [img, setImg] = useState('');
    const [isZoomIn, setZoomin] = useState(false);
    const [selectedIndex, setIndex] = useState(0);
    const scrollRef = useRef();

    useEffect(() => {
        setIndex(index)
        if (list && list[index]) {
            setImg(list[index].url);
        }
        //scrollRef.current.scrollTo(0, 0);
        // clean up function
        return()=>{
        }
    }, [ index , list ]);

    const handleClickThumbnail = (n) => {
        setIndex(n);
        setImg(list[n].url);

        scrollRef.current.scrollTo(0, 0);
    }

    const clickZoomInImage = () => {
        const f = !isZoomIn;
        setZoomin(f)
    }

    const imgStyle = { 
        maxWidth : isZoomIn ? 'fit-content' : '100%',
        cursor: isZoomIn ? 'zoom-out' : 'zoom-in'
    }

    return (
        <div className={`${styles.fillScreen} ${styles.attachmentOverlay} ${styles.items}`}>
                <div className={ styles.thumWrap}>
                    <div className= { styles.title }>
                        <span>{title}</span>
                    </div>
                    <div className= { styles.btnCloseWrap}>
                        <button onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className= {styles.thumbnailContainer}>
                    <ThumbnailList list={list}
                        selectedIndex={selectedIndex}
                        handleClick={handleClickThumbnail} />
                </div>
                <div ref={scrollRef} style={ isZoomIn ? {overflowX :'auto'} : null}className={styles.imgWrap}>
                    <div className={styles.imgInner} onClick={clickZoomInImage}>
                        <img style={imgStyle}  src={img} alt='originalImg' />
                    </div>
                </div>
            </div>
    )
}


export const ZoomOut = () => {
    return (
        <div>
            dasdfjslkfjlaskjdflasjkf
        </div>
    )
}
export default ZoomIN;