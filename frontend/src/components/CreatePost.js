import React, { Component } from 'react';
import {
	Button, InputLabel, MenuItem, Select, Grid, Typography,
	FormControlLabel, TextField, FormControl,
	FormHelperText, Radio, RadioGroup, Container
} from '@material-ui/core';
import Cities from './Cities'
import Categories from './Categories'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default class CreatePostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityList: [],
			categoryList: []
		};
		this.handleCreateButtonPressed = this.handleCreateButtonPressed.bind(this)
		this.handleCategoryChange = this.handleCategoryChange.bind(this)
		this.handleTitleChange = this.handleTitleChange.bind(this)
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
		this.handleImageChange = this.handleImageChange.bind(this)
		this.handlePriceChange = this.handlePriceChange.bind(this)
		this.handleCityChange = this.handleCityChange.bind(this)
		this.getCookie = this.getCookie.bind(this)
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
	fetchCategories(){
		fetch("api/category-list")
			.then(response => response.json())
			.then(data =>
				this.setState({
					categoryList:data
				})
			)
		}
	fetchCities(){		
		fetch("api/city-list")
			.then(response => response.json())
			.then(data =>
				this.setState({
					cityList:data
				})
			)
	}

	componentWillMount() {
		this.fetchCategories()
		this.fetchCities()
	}

	handleCreateButtonPressed() {
		var csrftoken = this.getCookie('csrftoken')
		const url = '/api/create-post/';
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
	}


	render() {
		var categories = this.state.categoryList
		var cities = this.state.cityList
		var self = this
		return (
			<Container className='container'>
				<Typography variant="h5" component="h5">Разместить новое объявление</Typography>
				<form>
					<Grid container
						direction="row"
						justify="flex-start"
						alignItems="flex-start"
						spacing={4}
					>
						<Grid item xs={12} md={6}>

							<FormControl
								className="form-control"
								id='form-control'
								variant="outlined"
								size='small'
							>
								<InputLabel id="select-outlined-label">Выберите категорию</InputLabel>
								<Select
									labelId="select-outlined-label"
									onChange={this.handleCategoryChange}
									label="Категория"
								>
									{categories.map(function (category) {
										return (
											<MenuItem
												className='menuCategory'
												value={category.id}
											>{category.name}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>

							<TextField
								className="form-control"
								variant="outlined"
								required={true}
								type='text'
								size='small'
								onChange={this.handleTitleChange}
								fullWidth
							/>
							<FormHelperText>Название не должно превышать 50 символов</FormHelperText>

							<TextField

								className="form-control"
								variant="outlined"
								required={true}
								type='text'
								multiline
								rows={4}
								onChange={this.handleDescriptionChange}
								fullWidth
							/>
							<FormHelperText
							>Описание не должно превышать 3000 символов</FormHelperText>

							<TextField
								className="form-control"
								variant="outlined"
								size='small'
								required={true}
								type='number'
								onChange={this.handlePriceChange}
								inputProps={{
									min: 1
								}}
							/>
							<FormHelperText>Цена</FormHelperText>
							<div className='container'>
								<input
									accept="image/*"
									id="button-file"
									onChange={this.handleImageChange}
									multiple
									type="file"
								/>

								{/* <label htmlFor="button-file">
									<Button 
									variant="outlined"
									color="primary" 
									component="span"
									size="small">
										Загрузить фото
        				</Button>
								</label> */}
							</div>

							<FormControl
								className="form-control"
								id='form-control'
								variant="outlined"
								size='small'
							>
								<InputLabel id="select-outlined-label">Укажите местоположение</InputLabel>
								<Select
									labelId="select-outlined-label"
									onChange={this.handleCityChange}
									label="Категория"
								>
									{cities.map(function (city) {
										return (
											<MenuItem
												className='menuCategory'
												value={city.id}
											>{city.name}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>

							<div style={{ marginTop: 15 }}>
								<Button
									color='primary'
									variant='contained'
									onClick={this.handleCreateButtonPressed}
								>Создать объявление
        					</Button>
							</div>
						</Grid>

						<Grid item xs>
							<Typography>Объявление</Typography>

						</Grid>
					</Grid>
				</form>
			</Container>
		)
	}
}