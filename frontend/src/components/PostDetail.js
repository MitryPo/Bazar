import React from 'react';
import {
  Breadcrumb, Image, Affix, Avatar,
  Tag, Card, Row, Col, Button, Space, Result
} from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';

import AppBar from './Parts/Header'


class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: {}
    }

  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch(`/api/product/${id}`)
    .then(res => {
      if (res.ok) {
        return (
          res.json()
          .then(data => {
            this.setState({
              components: data
            })
            // console.log(data)
          })
        )
      } else if(res.status === 404) {
        return <NotFound/>
      } else {
        return Promise.reject('some other error: ' + res.status)
      }
    })
  }


  render() {
    var post = this.state.components
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
                      <Space
                        direction='horizontal'
                        size='large'
                      >
                        <h1>
                          {post.title}
                        </h1>
                        {
                          post.sold === true ?

                            <Tag color="#87d068">Продано</Tag>
                            :
                            <div></div>
                        }
                      </Space>
                    </Col>

                    <Col>
                      <a
                        style={{ float: 'right' }}
                      >Добавить в избранное
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
                      Показать номер
                  </Button>
                  </div>

                  <div style={{ paddingBottom: '1em' }}>
                    <Button type="dashed" size='large' block>
                      Написать продавцу
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

        </div>
      </div>
    )
  }
}

export default PostDetail