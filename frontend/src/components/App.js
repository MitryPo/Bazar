import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import HomePage from "./HomePage"
import CreatePost from "./CreatePost"
import PostDetail from "./PostDetail"


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/create-post' component={CreatePost} />
            <Route path='/post/<int:pk>' component={CreatePost} />
          </Switch>
        </Router>
    );
  }
}