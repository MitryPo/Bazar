import React, { Component } from 'react';
import {
	Badge, Grid, Avatar, TextField,
	Button, Menu, MenuItem
} from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import DehazeIcon from '@material-ui/icons/Dehaze';


export default class AppBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			activeItem: {
				id: null,
				name: '',
			}
		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	componentDidMount() {
		fetch("api/category-list")
			.then(response => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Невозможно загрузить категории" };
					})
				}
				return response.json();
			})
			.then(data => {
				this.setState(() => {
					return {
						data,
						loaded: true
					}
				})
			})
	}



	render() {
		var categories = this.state.data
		var self = this
		return (
			<Grid container
				direction="row"
				justify="space-between"
				alignItems="center"
				spacing={2}
			>
				<Grid item xs>
					<PopupState variant="popover" popupId="demo-popup-menu">
						{(popupState) => (
							<React.Fragment>
								<Button
									className="catButton"
									fullWidth
									variant="outlined"
									color="primary"
									margin={10}
									startIcon={<DehazeIcon
									/>}
									{...bindTrigger(popupState)}
								>Категории
                            </Button>
								<Menu {...bindMenu(popupState)}>
									{categories.map(function (category, index) {
										return (
											<MenuItem onClick={popupState.close} key={index}>{category.name}</MenuItem>
										)
									})}
								</Menu>
							</React.Fragment>
						)}
					</PopupState>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						className="search"
						variant="outlined"
						label="Поиск по объявлениям"
						fullWidth
						size="small">
					</TextField>
				</Grid>
				<Grid item xs={12} md={3}>
					<Button
						className="addButton"
						variant="contained"
						color="primary"
						fullWidth
					>Добавить объявление
              </Button>
				</Grid>
				<Grid item xs>
					<Button href="/">
						<Badge color="secondary" overlap="circle" badgeContent={1}>
							<Avatar className="avatar">ДП</Avatar>
						</Badge>
					</Button>
				</Grid>
			</Grid>
		)
	}
}