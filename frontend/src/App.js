import './App.css';
import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HeaderCarousel } from './components/Carousel'
import Posts from './components/Posts/Posts'
import LoadingComponent from './components/Posts/Loading'
import { Row, Col } from 'antd';
import { axiosInstance } from './axios'

export const PostContext = React.createContext()

function App(params) {
  const PostLoading = LoadingComponent(Posts)
  const [appState, setAppState] = useState({ loading: true, posts: null })

  useEffect(() => {
    axiosInstance
      .get(`product-list/?${params}`)
      .then((res) => {
        setAppState({
          posts: res.data,
          loading: false
        })
      })
  }, [])

  return (
    <div className="App">
        <Header />
        <HeaderCarousel />
        <Row justify='space-between' style={{ marginTop: '4rem' }}>
          <Col xs={20} sm={20} md={19} lg={18}>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
          </Col>
          <Col></Col>
        </Row>
    </div >
  );
}

export default App;
