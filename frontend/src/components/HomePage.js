import React, { Component } from 'react';
import { Grid, Container, Typography } from '@material-ui/core';

import AppBar from './AppBar'
import Posts from './Posts'
import FavouritePosts from './FavouritePosts'

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container className='container'>
				<div className="container">

					<AppBar />

				</div>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					spacing={5}>
					<Grid item xs={12} md={8}>
						<div className="container">
							<Typography variant="h5" component="h5">
								Все объявления
      				</Typography>
						</div>

						<Posts />

					</Grid>
					<Grid item xs={12} md={4}>
						<div className="container">
							<Typography variant="h5" component="h5">
								Избранные объявления
      				</Typography>
						</div>

						<FavouritePosts />

					</Grid>
				</Grid>
			</Container>

		);
	}
}