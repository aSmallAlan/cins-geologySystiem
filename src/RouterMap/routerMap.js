import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hashHistory } from 'react-router' ;
import { Provider } from 'react-redux'
import HomePage from '../Containers/HomePage'
import SliceListPage from '../Containers/SliceListPage'
import AnalyzePage from '../Containers/AnalyzePage'
import SearchDataPage from '../Containers/SearchDataPage'
import configureStore from '../Store/configureStore';

let store = configureStore();

class RouterMap extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/searchData' component={SearchDataPage} />
                        <Route path='/sliceList/:id' component={SliceListPage}/>
                        <Route path='/analyze' component={AnalyzePage}/>
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}

export default RouterMap;
