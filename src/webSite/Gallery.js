import React, { useEffect, useState, useCallback } from 'react'
import GalleryRenderer from './GalleryRenderer';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './Gallery.module.scss';
import SliderFilter from './SliderFilter';
import { LoadingCircle } from '../component/Loading';

const Gallery = (props) => {
    const { match, location } = props;
    const [category, setCategory] = useState('');
    const [ isLoading, setLoading ] = useState(true);
    const [state, setState] = useState({
        list: [],
        menuList: [
            { label: 'All', url: 'all' },
            { label: 'WebSite', url: 'web' },
            { label: 'Game', url: 'Game' },
        ]
    });

    const categoryCallback = useCallback((_category) => {
        //console.log('categoryCallback ', _category, category);
        if (_category !== category) {
            fetchData(_category);
        }
    },[category]);

    async function fetchData(_category) {
        setCategory(_category);
        const result = await axios.get(`/api/web/list/${_category}`);
        let arr = [];
        //console.log('서버에서 데이터를 가져옵니다.')
        result.data.list.forEach((item, index) => {
            arr.push({
                no: item.PORTFOLIO_NO,
                category: item.PORTFOLIO_CATEGORY,
                title: item.PORTFOLIO_TITLE,
                year : item.PORTFOLIO_YEAR,
                month : item.PORTFOLIO_MONTH,
                link: item.PORTFOLIO_URL,
                createDate: item.PORTFOLIO_YMD,
                description : item.PORTFOLIO_CONTENT,
                image: `/imgUploads/${item.IMAGES_NAME}`,
            })
        })
        setState(prev => ({
            ...prev,
            list: arr
        }));

        setLoading(false);
    }

    useEffect(() => {
        if(match.path==='/' && location.pathname !== match.path){
            //console.log('완전다른화면')
        }else if(match.path==='/'){
            categoryCallback('all');
        }else{
            categoryCallback(match.params.category);
        }
        // clean up function
        return () => {
            //console.log('갤러리 삭제', category)
        }
    }, [match, location, categoryCallback]);

    const renderer = state.list.map((item, index) => {
        return (
            <li key={index}>
                <Link to={`/shots/${item.no}`} style={{ animationDelay: `${index * .1 + .2}s` }}>
                    <GalleryRenderer image={item.image}
                        title={item.title}
                        year={item.year}
                        month={item.month}
                        description={item.description}
                        link={item.link} />
                </Link>
            </li>
        )
    });

    return (
        <>
            <div className={styles.gallery}>
                <div className={styles.navi}>
                    <SliderFilter category={category} path={`${match.path}shots/gallery`} list={state.menuList} />
                </div>
                
                    { isLoading ? (
                        <div className={styles.loading}>
                            <LoadingCircle />
                        </div>
                    ) : (
                        <div className={styles.content}>
                        <ul>
                            {renderer}
                        </ul>
                        </div>
                    )}
            </div>
        </>
    )
}

export default Gallery;