import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../Containers/HomePage'
import OperateSelectPage from '../Containers/OperateSelectPage'
import SearchDataPage from '../Containers/SearchDataPage'

class RouterMap extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/operateSelect' component={OperateSelectPage}/>
                    <Route path='/searchData' component={SearchDataPage} />
                </Switch>
            </HashRouter>
        )
    }
}

export default RouterMap;
