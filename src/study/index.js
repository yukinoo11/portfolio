import React, { useEffect } from 'react'
import Navigation from './../webSite/Navigation';
import List from './List';
import StudyApp from './main';
import { Route, Link, Switch } from "react-router-dom";
import './style.css';
import styles from './../main/index.module.css'

const StudyMain = ( props ) => {
    
    const menu = [
        { label : '부동산학 개론', category:1},
        { label : '민법', category:2},
        { label : '중개사법', category:3},
        { label : '공법', category:4},
        { label : '공시법', category:5},
        { label : '세법', category:6}
    ];

    useEffect(()=>{
    },[]);

    const renderer = menu.map(( item, index) =>{
        return(
            <li key={index}><Link to={`/study/${item.category}`}>{item.label}</Link></li>
        )
    });

    return(
        <div className='web'>
            <div className='header'>
            <Navigation>
                <ul>
                    {renderer}
                </ul>
            </Navigation>
            </div>
            <div className='QuizWrap'>  
                <Switch>
                    <Route exact path='/study/oxquiz/:id' component = { StudyApp } />
                    <Route path='/study/:category' component={ List } />
                    <Route path='/study' component={ BitCategoryList } />
                </Switch>
            </div>
        </div>
    )
}
export default StudyMain;

const BitCategoryList = ( props ) => {

    const menu = [
        { label : '부동산학 개론', category:1},
        { label : '민법', category:2},
        { label : '중개사법', category:3},
        { label : '공법', category:4},
        { label : '공시법', category:5},
        { label : '세법', category:6}
    ];
    const renderer = menu.map(( item, index) =>{
        return(
            <li><Link to={`/study/${item.category}`}>{item.label}</Link></li>
        )
    });
    return(
        <div className={styles.menuWrap}>
            <section>
                <ul>
                    {renderer}
                </ul>
            </section>
        </div>
    )
}

