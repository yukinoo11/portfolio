import React, { useEffect, useState } from 'react'
import styles from './View.module.scss';
import axios from 'axios';
import useDateString from '../component/useDateStr';
import ZoomIN from './ZoomIN';

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

const View = (props) => {
    const { history, match } = props;
    const [state, setState] = useState({
        list: [
            //{ index: 1, url:'/images/work/Big/future.png'},
            //{ index: 2, url:'/images/work/Big/cats.png'},
        ],
        title: '',
        description: '',
        year: '',
        month: '',
    });
    const [open, setOpen] = useState(false);
    const dateStr = useDateString(state.year, state.month);

    useEffect(() => {
        const id = match.params.id;
        if( id === 'popular') return;
        async function fetchData() {
            const result = await axios.get(`/api/web/shots/${id}`);
            let arr = [];
            result.data.list.forEach((item, index) => {
                //console.log(item)
                arr.push({
                    index: index,
                    url: `/imgUploads/${item.IMAGES_NAME}`
                })
            });

            setState(prev => ({
                ...prev,
                list: arr,
                category : result.data.data[0].PORTFOLIO_CATEGORY,
                title: result.data.data[0].PORTFOLIO_TITLE,
                description: result.data.data[0].PORTFOLIO_CONTENT,
                year: result.data.data[0].PORTFOLIO_YEAR,
                month: result.data.data[0].PORTFOLIO_MONTH,
                link : result.data.data[0].PORTFOLIO_URL
            }));

            setOpen(true);
        }

        fetchData();

        return () => {

        }
    }, [ match ]);


    return (
        <>
        {state.title}
            <Contents open={open}
                history={history}
                list={state.list}
                category = { state.category}
                title={state.title}
                description={state.description}
                date={dateStr}
                link={state.link}/>
        </>
    )
}
const Contents = (props) => {
    const { open, list, title, category, description, date, history, link } = props;
    const [isPopup, setPopup] = useState(false)
    const [selectedIndex, setIndex] = useState(0);
    const [width, setWidth] = useState(getWidth());

    const showStyle = {
        opacity: open ? 1 : 0,
        transform: `translateY(${open ? '0' : '15%'}) scale(${open ? 1 : 0.98})`,
        pointerEvents: open ? 'visible' : 'none',
        overflowY: open ? 'scroll' : 'hidden',
    }

    const handleClickThumbnail = (index) => {
        setIndex(index);
    }

    const handleClickZoom = () => {
        setPopup(true)
    }

    const imgStyle = {
        //width: list.length * 100 + "%"
        width : width > 1000 ? list.length * 1000 : list.length * width,
        transform: `translate3d(${ (width > 1000 ? 1000 : width) * -selectedIndex}px, 0px, 0px)`,
        transition: `transform 200ms ease-out 0s`,
        height : `${700*width/1000}px`
    }

    const imgRendererStyle = {
        width : `${100 / list.length}%`
    }
    const imgRenderer = list.map((item, index) => {
        return (
            <li style={imgRendererStyle} key={index} onClick={handleClickZoom}>
                <div className={styles.mediaSlide}>
                <div className={styles.imgContainer}>
                    <div className={styles.img}>
                        <img src={item.url} alt={item.url} />
                    </div>
                </div>
                </div>
            </li>
        )
    });

    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth());
        }
        window.addEventListener('resize', resizeListener);
        const div = document.body;
        div.style.overflow = 'hidden';

        // clean up function
        return () => {
            // remove resize listener
            const div = document.body;
            div.style.overflow = 'auto';
            window.removeEventListener('resize', resizeListener);
        }
    }, [width, selectedIndex]);

    const clickedCloseBtn = () => {
        history.goBack();
    }

    const handleClickZoomInClose = () => {
        setPopup(false);
    }

    return (
        <>
            { isPopup ? (
                <ZoomIN title={ title } list={ list } index={selectedIndex} handleClick={handleClickZoomInClose} />
            ) : null}
            <div style={showStyle} className={styles.modal}>
                <div className={styles.head} >
                    <button onClick={clickedCloseBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.closeBtn} height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                            <path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                    </button>
                </div>
                <div className={styles.media}>
                    <div className={styles.shotMediaContainer}>
                        <header>
                            <h1>{title}</h1>
                            <div className={styles.date}>
                                <div className={styles.category}>{category}</div>
                                { date }
                                { link !== '' ? (
                                    <div className={styles.link} onClick={ ( e )=> {
                                        window.open(link, '_blank')
                                    }}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/></svg>
                                    Link</div>
                                ) : null }

   
                            </div>
                        </header>
                        <div className={styles.imgWrap}>

                            <div className={styles.imgBox}>
                                <ul style={imgStyle}>
                                    {imgRenderer}
                                </ul>
                            </div>
                        </div>
                        <ThumbnailList list={list}
                            selectedIndex={selectedIndex}
                            handleClick={handleClickThumbnail} />
                        <div className={styles.description}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ThumbnailList = (props) => {

    const { list, selectedIndex, handleClick } = props;

    const renderer = list.map((item, index) => {
        return (
            <li key={index}
                onClick={selectedIndex !== index ? (e) => handleClick(index) : null}
                className={selectedIndex === index ? styles.active : null}>
                <img src={item.url} alt='Thumbnail' />
            </li>
        )
    });

    return (
        <div className={styles.thumbnail}>
            <ul>
                {renderer}
            </ul>
        </div>
    )
}
export default View;
