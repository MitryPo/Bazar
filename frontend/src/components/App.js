import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams } from 'react-router-dom'
import HomePage from "./HomePage"
import CreatePost from "./CreatePost"
import PostDetail from "./PostDetail"
import MyPostDetail from "./MyPostDetail"
import FilterPosts from "./FilterPosts"
import Regist from "./Regist"
import Login from "./Login"
import LogOut from './LogOut'


class App extends Component {


  render() {
    
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/product/create' component={CreatePost} />
            <Route exact path='/product/:id' component={PostDetail} />
            <Route exact path='/my-product/:id' component={MyPostDetail} />
            <Route exact path='/category/:id' component={FilterPosts} />
            <Route exact path='/registration' component={Regist} />
            <Route exact path='/login' component={Login}/>
            <Route exact path='/logout' component={LogOut}/>
          </Switch>
        </Router>
    );
  }
}

export default App