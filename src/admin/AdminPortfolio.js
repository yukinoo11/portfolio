import React from "react";
import AdminPortfolioWrite ,{ AdminPortfolioView } from './AdminPortfolioWrite';
import AdminPortfolioList from './AdminPortfolioList';
import { Route, Switch } from "react-router-dom";
const AdminPortfolio = () => {
    return(
        <div>
            <Switch>
                <Route exact path='/admin/portfolio' component = { AdminPortfolioList } />
                <Route exact path='/admin/portfolio/view/:id' component={ AdminPortfolioView }/> 
                <Route exact path='/admin/portfolio/Write' component = { AdminPortfolioWrite } />
            </Switch>
        </div>
    )
}

export default AdminPortfolio;