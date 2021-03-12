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
		this.handleCategoryChange = this.handleCategoryChange.bind(this)
	}

	handleCategoryChange(e) {
		this.setState({
			category: e.target.value,
		});
	}

	componentDidMount() {
        fetch("api/category-list")
            .then(response => response.json())
            .then(data =>
                this.setState({
                    data
                })
            )
    }


	render() {
		var categories = this.state.data
		var self = this
		return (
				<FormControl
					className="form-control"
					variant="outlined"
					size='small'>
					<InputLabel id="select-outlined-label">Выберите категорию</InputLabel>

					<Select
						labelId="select-outlined-label"
						onChange={this.handleCategoryChange}
						label="Местоположение"
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
		)
	}
}