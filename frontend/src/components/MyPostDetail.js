import React from 'react';
import { Breadcrumb, Image, Affix, Avatar, Card, Row, Col, Button, Space, message } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';

import AppBar from './Parts/Header'


class MyPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {}
    }
    this.productDelete = this.productDelete.bind(this)
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

  productDelete() {
    var csrftoken = this.getCookie('csrftoken')
    const id = this.props.match.params.id
    fetch(`/api/my-product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        "type": "formData",
        'X-CSRFToken': csrftoken,
      }
    })
      .then(window.location.href = '/')
      .then(message.success('Успешно удалено'))
  }

  render() {
    var post = this.state.components
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
            token !== null ?

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

                        <Col

                        >
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
                        <Button 
                        onClick={this.productDelete}
                        type="dashed" 
                        size='large' 
                        block
                        >
                          Удалить
                  </Button>
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
                              <p>Максим</p>
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