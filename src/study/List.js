import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from './List.module.scss';

const List = ( props ) => {
    const {  match } = props;
    const [ state, setState ] = useState({
        subject:'', 
        dday : 0,
        list:[{ label : '화폐의 시간가치', id : 'step'}]
    });

    useEffect(()=>{

        async function fetchData(){
            const result = await axios.get(`/api/admin/study/getCategory`);
            const list = result.data.list;
            const date = new Date('2021/10/31');
            const dday = Math.floor((date.getTime() - Date.now()) / 86400000 );
            setState( prev => ({
                ...prev,
                subject : result.data.subject,
                list : list,
                dday:dday
            }));
        }

        fetchData();
    },[ match.params.category ]);

    const renderers = state.list.map(( item, index )=> {
        const { category_Detail_NM , categoryID } = item;
        return (
            <li key={index}>
                <Link to={`/study/oxquiz/${ categoryID }`}>
                    <span className={styles.count}>{index + 1 }</span>
                    <span>{category_Detail_NM}</span>
                </Link>
            </li>    
        )
    });

    return(
        <div className = { styles.StudyMain }>
            {/* Header */}
            <header>
                <span>{ state.subject }</span>
                <span className={ styles.dday }>D - {state.dday}</span>
            </header>
            {/* Section */}
            <section>
                <ul>
                   { renderers }
                </ul>
            </section>
            {/* Footer */}
            <footer>
                푸터영역
            </footer>
        </div>
    )
}

export default List;