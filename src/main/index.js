import React from "react";
import styles from "./index.module.css";
import { Link } from 'react-router-dom';

const MainApp =() =>{
    return(
        <>
        <div className = { styles.menuWrap }>
            <ul>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/game">Game</Link></li>
                <li><Link to="/study">Quiz</Link></li>
                <li><Link to="/web">WebSite</Link></li>
            </ul>
        </div>
        </>
    )
}

export default MainApp;