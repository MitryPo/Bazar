import React from 'react';
import {
  Breadcrumb, Image, Affix, Modal, Avatar, Dropdown,
  Menu, Card, Result, Typography, Row, Col, Button, Space, message
} from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';

import AppBar from './Parts/Header'


class MyPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {},
      cityList: [],
      categoryList: [],
      sold: false,
    }
    this.productDelete = this.productDelete.bind(this)
    this.productSold = this.productSold.bind(this)
    this.fetchCategories = this.fetchCategories.bind(this)
    this.fetchCities = this.fetchCities.bind(this)
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  handleSoldChange() {
    this.setState({
      sold: true
    })
  }

  modalSuccess() {
    Modal.success({
      content: 'Товар снят с продажи',
    });
  }
  modalError() {
    Modal.error({
      content: "Произошла ошибка"
    });
  }

  fetchCategories() {
    fetch('/api/category/all')
      .then(response => response.json())
      .then(data => {
        this.setState({
          categoryList: data
        })
        // console.log(data)
      })
  }
  fetchCities() {
    fetch("/api/city-list")
      .then(response => response.json())
      .then(data => {
        this.setState({
          cityList: data
        })
        // console.log(data)
      })
  }

  componentWillMount() {
    this.fetchCategories()
    this.fetchCities()
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/my-product/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          components: data
        })
        // console.log(data)
      })
  }

  productSold(post) {
    post.sold = !post.sold
    var csrftoken = this.getCookie('csrftoken')
    const id = this.props.match.params.id
    fetch(`/api/my-product/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ 'sold': post.sold })
    })
      .then((res) => {
        res.status === 200?
        this.modalSuccess()
        :
        this.modalError()
      })
      
  }

  productDelete() {
    var csrftoken = this.getCookie('csrftoken')
    const id = this.props.match.params.id
    fetch(`/api/my-product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      }
    })
      
      .then((res) => {
        res.status === 200?
        window.location.href = '/'
        :
        this.modalError()
      })
  }

  render() {
    var post = this.state.components
    const { Text } = Typography
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.productSold}>Товар продан</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="https://www.aliyun.com">Другая причина</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <a onClick={this.productDelete}><Text type="danger">Удалить товар</Text></a>
        </Menu.Item>
      </Menu>
    );
    const token = localStorage.getItem('access_token')
    var options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return (
      <div>

        <div>
          <AppBar />
        </div>


        <div
          style={{ padding: '1em 0 0em 4em' }}
        >
          <Breadcrumb separator=">">
            <Breadcrumb.Item href='/'>Главная</Breadcrumb.Item>
            <Breadcrumb.Item href=''>{post.category}</Breadcrumb.Item>
            {/* <Breadcrumb.Item href=''>Подкатегория</Breadcrumb.Item> */}
          </Breadcrumb>
        </div>

        <div className='container'>

          {
            token !== null?

              <Row>

                <Col
                  style={{ width: `70%` }}
                >

                  <div className="container">
                    <div>
                      <Row
                        justify='space-between'
                        align='middle'
                      >

                        <Col>
                          <h1>
                            {post.title}
                          </h1>
                        </Col>

                        <Col>
                          <a
                            style={{ float: 'right' }}
                          >
                          </a>
                        </Col>

                      </Row>
                      <div style={{ padding: '2em 5em' }}>
                        <Image.PreviewGroup>
                          <Image
                            width={`65%`}
                            src={post.image}
                            fallback='/media/unnamed.png'
                          />
                        </Image.PreviewGroup>
                      </div>

                      <Row
                        style={{ padding: '2em 0' }}
                      >

                        <Col
                          style={{ width: `40%` }}
                        >
                          <Space
                            direction='vertical'
                            wrap>
                            <h3 style={{ color: 'gray' }}>Местоположение:</h3>
                            <div style={{ padding: '2em 0' }}>
                              <h3 style={{ color: 'gray' }}>Описание: </h3>
                            </div>
                            <h3 style={{ color: 'gray' }}>Категория: </h3>
                            <h3 style={{ color: 'gray' }}>Размещено: </h3>
                          </Space>
                        </Col>

                        <Col>

                          <Space
                            direction='vertical'
                            wrap>
                            <h3>{post.city}</h3>
                            <div style={{ padding: '2em 0' }}>
                              <h3>{post.description}</h3>
                            </div>
                            <h3>{post.category}</h3>
                            <h3>{new Date(post.date_created).toLocaleDateString("ru-RU", options)}</h3>
                          </Space>

                        </Col>

                      </Row>
                    </div>

                  </div>
                </Col>

                <Col style={{ width: `25%` }}>

                  <Affix
                    offsetTop={80}
                  >

                    <div className="container">

                      <div>
                        <h1>
                          {`${post.price} Р`}
                        </h1>
                      </div>

                      <div style={{ padding: '2em 0em 1em 0em' }}>
                        <Button type="primary" size='large' block>
                          Редактировать
                  </Button>
                      </div>

                      <div style={{ paddingBottom: '1em' }}>

                        <Dropdown
                          overlay={menu}
                          trigger={['click']}
                          placement="bottomCenter"
                        >

                          <Button
                            type="dashed"
                            size='large'
                            onClick={e => e.preventDefault()}
                            block
                          >
                            Снять с продажи
                          </Button>

                        </Dropdown>

                      </div>

                      <div>
                        <Row>
                          <Col style={{ padding: '1em 1em 0 0' }}>
                            <Avatar
                              style={{ background: "lightgreen" }}
                              shape="circle"
                              size={57}
                              icon={<UserOutlined />} />
                          </Col>

                          <Col style={{ paddingTop: '1em' }}>
                            <div>
                              <p>{post.creator}</p>
                              <p>На сайте с 12 мая 2020</p>
                            </div>
                          </Col>

                        </Row>
                      </div>

                    </div>

                  </Affix>

                </Col>

              </Row>
              :
              window.location.href = '/login'
          }
        </div>

      </div>

    )
  }
}

export default MyPostDetail