import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams } from 'react-router-dom'
import HomePage from "./HomePage"
import CreatePost from "./CreatePost"
import PostDetail from "./PostDetail"
import FilterPosts from "./FilterPosts"


export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/product-create' component={CreatePost} />
            <Route exact path='/product/:id' component={PostDetail} />
            <Route exact path='/category/:id' component={FilterPosts} />
          </Switch>
        </Router>
    );
  }
}