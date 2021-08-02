import React, { useEffect, useState } from "react";
import styles from './GameApp.module.scss';
import Navigation from './../webSite/Navigation';
import axios from 'axios';
import { Link } from "react-router-dom";

const GameApp = (props) => {
    const { match } = props;
    const [state, setState] = useState({
        list: [
            { gameKey: 'findColor', title: '제목', category: '퍼즐/보드', playCount: 200 },
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/game/list`)
            //소분류
            setState({
                list: result.data.list
            });
        }

        fetchData();
    }, []);
    const renderer = state.list.map((item, index) => {
        return (
            <li key={index}>
                <div>
                    <dl>
                        <dt><Link to={`/play/${item.gameKey}`}><img src='/imgUploads/background_fmlove2300.png' alt='thumbnail' /></Link></dt>
                        <dd className={styles.title}>{item.title}</dd>
                        <dd className={styles.category}>{item.category}</dd>
                        <dd className={styles.count}><i className={styles.playCount}></i>{item.playCount}</dd>
                    </dl>
                </div>
            </li>
        )
    })

    return (

        <div className={styles.wrap}>
            <div className='header'>
                <Navigation match={match}>
                    <ul>
                        <li>
                            <label><Link to='/web/shots/gallery/all'>Work</Link></label>
                        </li>
                        <li>
                            <label><Link to='/web/Learn'>Learn</Link></label>
                        </li>
                        <li>
                            <label><Link to='/web/information'>Infomation</Link></label>
                        </li>
                    </ul>
                </Navigation>
            </div>
            <div className={styles.container}>
                <div className={styles.list}>
                    <ul>
                        {renderer}
                    </ul>
                </div>
                <div className={styles.footer}>
                    footer
                </div>
            </div>
        </div>
    )
}
export default GameApp;