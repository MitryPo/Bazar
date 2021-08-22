import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import Login from './components/Auth/Login'
import SignUp from './components/Auth/Register'
import {NotFound} from './components/page404'

const routing = (
    <Router>
      <React.StrictMode>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/login' component={Login} />
          <Route path='/registration' component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </React.StrictMode>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
