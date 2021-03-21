import React, { Component } from 'react';
import { Card, Row, Col, Space } from 'antd';

import AppBar from './Parts/AppBar'
import Posts from './Parts/Posts'
import FavouritePosts from './FavouritePosts'


class FilterPosts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postList: [],
			category: {}
		}
		this.fetchCategory = this.fetchCategory.bind(this)
		this.fetchPosts = this.fetchPosts.bind(this)
	}

	componentDidMount() {
		this.fetchCategory()
		this.fetchPosts()
	}

	fetchPosts() {
		const id = this.props.match.params.id
		fetch(`/api/product-list/?category=${id}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					postList: data
				})
				// console.log(data)
			})
	}
	fetchCategory() {
		const id = this.props.match.params.id
		fetch(`/api/category/${id}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					category: data
				})
				// console.log(data)
			})
	}


	render() {
		const { Meta } = Card;
		const category = this.state.category
		var posts = this.state.postList
		return (
			<div>

				<div style={{ padding: 20 }}>
					<AppBar />
				</div>

				<div style={{ padding: 20 }}>
					<Row>
						<Col>
							<div style={{ paddingBottom: 20 }}>
								<h1>
									{category.name}
								</h1>
							</div>
							<Row>
								{posts.map(function (post, index) {
									return (
										<Col
											flex={5}
											key={index}
										>
											<div style={{ paddingBottom: 15 }}>
												<Card
													hoverable
													size='small'
													style={{ maxWidth: 200 }}
													cover={<img height={200} src={post.image}></img>}
												>
													<Meta title={`${post.price} Р `} description={post.title} />
												</Card>
											</div>
										</Col>
									)
								})}
							</Row>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default FilterPosts