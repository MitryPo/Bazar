import { Button, Col, Form, PageHeader, Input, InputNumber, message, Row, Select, Steps } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';





export default class CreatePostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      categoryList: [],
      uploading: false
    };
    this.handleFinish = this.handleFinish.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.fetchCategories = this.fetchCategories.bind(this)
    this.fetchCities = this.fetchCities.bind(this)
    this.handleChange = this.handleChange.bind(this)

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

  handleCategoryChange(e) {
    this.setState({
      category: e.target.value,
    });
  }
  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  handleImageChange(e) {
    this.setState({
      uploading: true,
      image: e.target.files[0],
    });
    console.log(e.target.files)
  }
  handlePriceChange(e) {
    this.setState({
      price: e.target.value,
    });
  }
  handleCityChange(e) {
    this.setState({
      city: e.target.value,
    });
  }
  fetchCategories() {
    fetch('api/category-list')
      .then(response => response.json())
      .then(data => {
        this.setState({
          categoryList: data
        })
        console.log(data)
      })
  }
  fetchCities() {
    fetch("api/city-list")
      .then(response => response.json())
      .then(data =>
        this.setState({
          cityList: data
        })
      )
  }

  componentDidMount() {
    this.fetchCategories()
    this.fetchCities()
  }

  handleFinish() {
    var csrftoken = this.getCookie('csrftoken')
    const url = '/api/product-create';
    const formData = new FormData()

    formData.append('category', this.state.category);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('image', this.state.image, this.state.image.name);
    formData.append('price', this.state.price);
    formData.append('city', this.state.city);
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        "type": "formData",
        'X-CSRFToken': csrftoken,
      },
    })
      .then((data) => console.log(data))
      .catch(err => console.log(err))
      .then(message.success('Успешно опубликовано'))
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    var categories = this.state.categoryList
    var cities = this.state.cityList
    const { Step } = Steps
    return (
      <div className='container'>
        <Row>

          <Col
            flex
            style={{ width: `70%` }}
          >
            <PageHeader
              style={{paddingBottom: '2em'}}
              className="site-page-header"
              onBack={() => null}
              title={<h2>Добавить объявление</h2>}
              // subTitle="This is a subtitle"
            />
            
            <Form
              labelCol={{ span: 4, }}
              wrapperCol={{ span: 14, }}
              layout="horizontal"
              onFinish={this.handleFinish}
            // onFinishFailed={message.error('Произошла ошибка')}
            >

              <Form.Item
                label="Категория"
                required={true}
                onChange={this.handleCategoryChange}
              >
                <Select
                  onChange={this.handleChange}
                  defaultValue={1}
                >
                  {categories.map(function (category, index) {
                    return (
                      <Select.Option
                        key={index}
                        value={category.id}
                      >{category.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Название продукта"
                required={true}
                onChange={this.handleTitleChange}
              >
                <Input
                  maxLength={50}
                />
              </Form.Item>

              <Form.Item
                label="Описание продукта"
                onChange={this.handleDescriptionChange}
              >
                <Input.TextArea
                  showCount
                  maxLength={3000}
                  rows={5}
                />
              </Form.Item>

              <Form.Item
                label="Цена"
                required={true}
                onChange={this.handlePriceChange}
              >
                <InputNumber /> Р
							</Form.Item>

              <Form.Item
                label="Фото продукта"
              // required={true}

              >
                <input
                  accept="image/*"
                  id="button-file"
                  onChange={this.handleImageChange}
                  type="file"
                />
              </Form.Item>

              <Form.Item
                label="Местоположение"
                required={true}
                onChange={this.handleCityChange}
              >
                <Select
                  onChange={this.handleChange}
                  defaultValue={1}
                >
                  {cities.map(function (city, index) {
                    return (
                      <Select.Option
                        key={index}
                        value={city.id}
                      >{city.name}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{ offset: 4 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Опубликовать
        			</Button>
              </Form.Item>

            </Form>
          </Col>

          <Col
            style={{ width: `30%` }}
          >
            <div style={{ paddingTop: '6rem' }}>
              <Steps direction="vertical" size="small" current={1}>
                <Step title="Категория" />
                <Step title="Название и описание" />
                <Step title="Цена" />
                <Step title="Фото" />
                <Step title="Местоположение" />
              </Steps>
            </div>
          </Col>

        </Row>
      </div>
    )
  }
}
