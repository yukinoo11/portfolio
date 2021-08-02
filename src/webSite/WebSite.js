import React, { useEffect } from 'react'
import Navigation from './Navigation';
import View from './View';
import Infomation from "../portfolio/Information";
import Gallery from './Gallery';
import { Route, Switch } from "react-router-dom";
import './WebSite.css';

const WebSite = (props) => {
    const { match } = props;
    useEffect(() => {

        // clean up function
        return () => {
        }
    }, []);

    return (
        <>
            <div className='web'>
                <div className='header'>
                    <Navigation match={match}>
                        <ul>
                            <li><a href='/information'>경력기술서</a></li>
                        </ul>
                    </Navigation>
                </div>
            </div>
            <Switch>
                <Route exact path='/information' component= { Infomation } />
                <Route exact path = {`${match.url}shots/gallery/:category`} component={Gallery} />
                <Route path = {`${match.url}`} component={Gallery} />
            </Switch>
            <Route exact path = {`${match.url}shots/:id`} component = { View } />
        </>
    )
}

export default WebSite;
