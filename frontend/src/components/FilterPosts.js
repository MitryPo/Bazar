import React, { Component } from 'react';
import { Card, Row, Col, Space } from 'antd';

import AppBar from './Parts/Header'
import Posts from './Parts/Posts'


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
		var category = this.state.category
		var posts = this.state.postList
		return (
			<div>

				<div>
					<AppBar />
				</div>

				<div className='container'>
					<div className='container'>

						<div style={{ paddingBottom: '2em' }}>
							<h1>
								{category.name}
							</h1>
						</div>

						<Row justify='space-between'>

							{posts.map(function (post, index) {
								return (

									<Col
										flex={5}
										key={index}
									>
										<div style={{ paddingBottom: 20 }}>

											<a href={`/product/${post.id}`}>
												<Card
													hoverable
													size='small'
													style={{ maxWidth: 220 }}
													cover={<img style={{
														borderTopLeftRadius: 10,
														borderTopRightRadius: 10
													}}
														height={200} src={post.image}></img>}
												>
													<Meta
														title={`${post.price} Р `}
														description={post.title}
													/>
												</Card>
											</a>
										</div>

									</Col>
								)
							})}
						</Row>
					</div>
				</div>
			</div >
		)
	}
}

export default FilterPosts