import React, { Component } from 'react';
import {Grid, Card, Typography, CardMedia,
  			CardContent, CardActionArea} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';




export default class FavouritePosts extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
				spacing={2}
			>
				<Grid item xs={12} md={12}>
					<Card elevation={3}>
						<CardActionArea href="">
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="flex-start"
							>
								<Grid item xs={12} md={4}>
									<CardMedia
										component="img"
										alt="Contemplative Reptile"
										height="150"
										image="media/product_images/601e5c55e308d468692fe230-1.jpg"
										title="Contemplative Reptile"
									/>
								</Grid>
								<Grid item xs={12} md={7}>
									<CardContent>
										<Typography variant="h6" component="h6">
											100 Р
                            </Typography>
										<Typography gutterBottom variant="body2" component="p">
											Объявление 1
                            </Typography>
									</CardContent>
								</Grid>
								<Grid item xs>
									<FavoriteIcon color="secondary" />
								</Grid>
							</Grid>
						</CardActionArea>
					</Card>
				</Grid>

				<Grid item xs={12} md={12}>
					<Card elevation={3}>
						<CardActionArea href="">
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="flex-start"
							>
								<Grid item xs={12} md={4}>
									<CardMedia
										component="img"
										alt="Contemplative Reptile"
										height="150"
										image="media/product_images/60200dd0.jpg"
										title="Contemplative Reptile"
									/>
								</Grid>
								<Grid item xs={12} md={7}>
									<CardContent>
										<Typography variant="h6" component="h6">
											200 Р
                                        </Typography>
										<Typography gutterBottom variant="body2" component="p">
											Объявление 2
                                        </Typography>
									</CardContent>
								</Grid>
								<Grid item xs>
									<FavoriteIcon color="secondary" />
								</Grid>
							</Grid>
						</CardActionArea>
					</Card>
				</Grid>

			</Grid>
		)
	}
}
