import React, { Component } from 'react';
import { Row, Affix, Col, Card, Space, Layout } from 'antd';
import AppBar from './Parts/AppBar'
import Carousel from './Parts/Carousel'
import Posts from './Parts/Posts'

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { Header, Footer, Sider, Content } = Layout
		const { Meta } = Card;
		return (
			<div>

				<div>
					<AppBar />
				</div>

				<div>
					<Carousel />
				</div>

				<div className='container'>

					<div className='container'>

						<Row>
							<Col
								flex
								style={{ width: `70%` }}
							>

								<div style={{ paddingBottom: '2em' }}>
									<h1>
										Все объявления
									</h1>
								</div>

								<Posts />

							</Col>

							<Col
								flex
								style={{
									paddingLeft: '4em',
									width: `30%`
								}}>
								<Affix
									offsetTop={100}
								>
									<div style={{ paddingBottom: '2em' }}>
										<h2>
											Избранные объявления
										</h2>
									</div>

									<div>
										<Card
											hoverable
											size='small'
											style={{ width: `100%` }}
										>
											<Meta
												title='3000 P'
												description='Новые наушники'
												avatar={
													<img
														height={130}
														width={130}
														src='/media/product_images/601a605994f9e55e2d065137-1.jpg'>
													</img>}
											/>
										</Card>
									</div>

									<div style={{ padding: '2em 0' }}>
										<Card
											hoverable
											size='small'
											style={{ width: `100%` }}

										>
											<Meta
												title='1500 P'
												description='Новые наушники'
												avatar={
													<img
														height={130}
														width={130}
														src='/media/product_images/602a42957cc2de7306273663-1_iPTyL0z.jpg'>
													</img>}
											/>
										</Card>
									</div>
								</Affix>
							</Col>
						</Row>
					</div>
				</div>
			</div >

		);
	}
}