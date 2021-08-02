import React, { Component } from "react";
import MetaTags from 'react-meta-tags';
import AdminApp from './admin/Index';
import WebSite from './webSite/WebSite';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class App extends Component {
  render(){
    return(
      <>
        <MetaTags>
          <meta httpEquiv="origin-trial" content="TOKEN_GOES_HERE" />
          <meta name = 'theme-color' content='#333333'/>
          <meta name = 'viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1.0, user-scalable=no' />
        </MetaTags>
        
        <Router>
            <Switch>
              {/*
              <Route exact path='/yukinoo11Main' component = { MainApp } />
              <Route exact path='/signin' component = { SignIn } />
              */}
              <Route exact path="/admin9756" component={AdminApp} />
              
              <Route path='/admin/:id' component = { AdminApp } />
              
              {/*
              <Route path='/study' component = { StudyMain } />
               */ }
              <Route path='/' component={ WebSite } />
              {/*
              <Route exact path='/game' component={ GameApp } />
              <Route exact path='/play/:id' component={ GamePlay } />
              */ }
              <Route component = { NotFound } />
            </Switch>
        </Router>
      </>
    )
  }
}
export default App;

const NotFound = ( props ) => {
  const { match } = props;

  return(
    <div className='NotFound'>
      <main>
        <span className='message'>요청한 페이지를 찾을수 없습니다.</span>
        <span className='subMessage'> Path:{ match.path }  , URL : {match.url}</span>
        <span><Link to='./' className='button-color'>이전 페이지로</Link></span>
      </main>
    </div>
  )
}