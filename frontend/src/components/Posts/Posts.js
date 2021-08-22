import React from 'react';
import { Card, Row, Col, Spin, Tag, Typography, Space } from 'antd';


export default function Posts(props) {
	const { Title } = Typography
	const { Meta } = Card;
	const { posts } = props

	if (!posts || posts.length === 0)
		return (
			<Title>Отсутствует соединение с интернетом</Title>
		)

	return (
		<Row justify='center' gutter={{ sm: 10, md: 10, lg: 5 }}>
			{posts.map((post, index) => (
				<Col
					flex
					xs={20} sm={10} md={7} lg={5}
					key={index}>
					<div style={{ paddingBottom: 20 }}>
						<a href={`product/${post.slug}`}>
							<Card
								hoverable
								size='small'
								style={{ maxWidth: 220 }}
								cover={
									<img style={{
										borderTopLeftRadius: 10,
										borderTopRightRadius: 10
									}}
										height={200} alt='' src={post.image}></img>}
							>
								<Space direction='vertical'>
									<Meta
										title={`${post.price} Р `}
										description={post.title.substr(0, 23)}
									/>
									{
										post.sold === true ?
											<Tag color="#87d068">Продано</Tag>
											:
											<div></div>
									}
								</Space>
							</Card>
						</a>
					</div>
				</Col>
			))}
		</Row>
	)
}