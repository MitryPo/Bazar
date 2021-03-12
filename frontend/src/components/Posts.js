import React, { Component } from 'react';
import {
	Grid, Typography, CardMedia,
	Card, CardContent, CardActionArea
} from '@material-ui/core';



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	componentDidMount() {
		fetch("api/post-list")
			.then(response => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Невозможно загрузить объявления" };
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
		var posts = this.state.data
		var self = this
		return (

			<Grid container
				direction="row"
				justify="center"
				alignItems="flex-start"
				spacing={2}>
				{posts.map(function (post, index) {
					return (
						<Grid item xs={9} sm={3} key={index}>
							<Card elevation={3}>
								<CardActionArea href={'api/post/${post.id}/'}>
									<CardMedia
										component="img"
										alt="Contemplative Reptile"
										height="150"
										image={post.image}
										title="Contemplative Reptile"
									/>
									<CardContent>
										<Typography variant="h6" component="h6">
											{post.price} Р
                                        </Typography>
										<Typography gutterBottom variant="body2" component="p">
											{post.title}
										</Typography>
										<Typography variant="inherit" color="textSecondary" component="h6">
											({post.city})
                                        </Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					)
				})}
			</Grid>
		)
	}
}