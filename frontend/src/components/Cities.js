import React, { Component } from 'react';
import {
	Grid, Typography, FormControl,
	InputLabel, Select, MenuItem
} from '@material-ui/core';



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.componentDidMount = this.componentDidMount.bind(this)
		this.handleCityChange = this.handleCityChange.bind(this)
	}

	handleCityChange(e) {
		this.setState({
			city: e.target.value,
		});
	}

	componentDidMount() {
        fetch("api/city-list")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    data
                })
            )
    }


	render() {
		var cities = this.state.data
		var self = this
		return (
				<FormControl
					className="form-control"
					variant="outlined"
					size='small'>
					<InputLabel id="select-outlined-label">Укажите местоположение</InputLabel>

					<Select
						labelId="select-outlined-label"
						onChange={this.handleCityChange}
						label="Местоположение"
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
		)
	}
}