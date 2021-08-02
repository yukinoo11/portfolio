import React, { useState, useEffect } from "react";
import axios from 'axios';
import Admin from './Admin';
import RegisterQuizMain from './RegisterQuiz';
import ListMain from './ListMain';
import ListGame from './GameList';
import FileView from "./FileView";
import CategoryMain from './CategoryMain';
import Navigation from './../webSite/Navigation';
import { Route, Switch, Link } from "react-router-dom";
import { SideMenu } from "../study/navigation";
import AdminPortfolio from "./AdminPortfolio";
import styles from './Index.module.scss';
import "./style.css";

export function getContents(id) {
  return axios.get('/admin/viewpage/' + id);
}

export function uploadImageUrl(fileName) {
  return '/uploads/' + fileName;
}

const AdminApp = (props) => {
  const { location , match  } = props;
  const [ closeNavi , setCloseNavi ] = useState(false);
  //
  const menu = [
    { label: 'Home', url: '' },
    { label: '퀴즈 카테고리', url: 'category' },
    { label: '퀴즈 등록하기', url: 'registQuiz' },
    { label: '퀴즈 목록', url: 'listQuiz' },
    { label: '게임 목록', url: 'list' },
    { label: 'PORTFOLIO', url: 'portfolio' },
    { label: '파일뷰어', url: 'fileViewer' }
  ];

  useEffect(() => {
  }, []);

  //Close
  const onClickedNaviationClose = () => {
    setCloseNavi(!closeNavi);
  }

  const menuRenderer = menu.map((item, index) => {
    const { id } = match.params;
    return (
      <li key={index} 
          className={ item.url === id || (id === undefined && item.url==='')  ? styles.select : ''}>
            <Link to={`/admin/${item.url}`}>
              {item.label}
            </Link>
      </li>
    )
  });

  return (
    <div className={styles.Admin}>
      <Navigation>
        <ul>
          {menuRenderer}
        </ul>
      </Navigation>

      { /*네비게이션*/}
      { closeNavi ? (
        <div className={styles.menuContainer}>
          <button onClick={onClickedNaviationClose}>&times;</button>
          <SideMenu menus={menu}
            onClicked={onClickedNaviationClose}
            url={location.pathname} />
        </div>
      ) : null}

      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.sidebar}>
            <ul>
              {menuRenderer}
            </ul>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.content}>

            <div className={styles.cardTopHead}>
              <h1 className='title'>
                {menu.find(item => item.url === match.params.id || match.params.id === undefined ).label}
              </h1>
            </div>

            <section>
              <div className={styles.contentInnerWrap}>
                <Switch>
                  <Route exact path='/admin' component={Admin} />
                  <Route path='/admin/category' component={CategoryMain} />
                  <Route path='/admin/registQuiz' component={RegisterQuizMain} />
                  <Route path='/admin/listQuiz' component={ListMain} />
                  <Route path='/admin/list' component={ListGame} />
                  <Route path='/admin/portfolio' component={AdminPortfolio} />
                  <Route path='/admin/fileViewer' component={FileView} />
                </Switch>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminApp;