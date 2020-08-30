import React, {Component} from 'react';
import 'antd/dist/antd.less';
import {Route, Switch} from 'react-router-dom'

import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
        
      </div>
    )
  }
}