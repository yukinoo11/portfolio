import React, { useState } from 'react'
import styles from './GalleryRenderer.module.scss';
import useDateString from '../component/useDateStr';

const GalleryRenderer = (props) => {
    const { image, title, description,  year, month, link } = props;
    const [isHovering, setHovering] = useState(true);
    const dateStr = useDateString(year, month);

    const handleMouseHover = () => {
        setHovering(!isHovering);
    }

    return (
        <div className={styles.inner}>
            <section>
                <div className={styles.boxPhoto}>
                    <div className={styles.img}
                            onMouseEnter={handleMouseHover}
                            onMouseLeave={handleMouseHover}>
                        <img src={image} alt='이미지'/>
                    </div>
                    <div className={` ${styles.boxCover}`}>
                        <div className={styles.explanation}> { description }</div>
                        <div className={styles.boxDetail}>
                            <div className={styles.items}>

                                {(link !== '') ? (
                                    <span className={styles.linkUrl}>
                                        <img src='/svg/pageview_black_24dp.svg' alt='img' />
                                        <span className={styles.linkText}>{ link }</span>
                                    </span>
                                ) : null }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.boxFooter}>
                    <label>{title}</label>
                    <div className={styles.date}>
                        { dateStr }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GalleryRenderer;