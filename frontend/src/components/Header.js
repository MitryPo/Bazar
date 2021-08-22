import React from 'react'
import { Row, Col, Typography, Affix, Input, Button, } from 'antd';
import { CategoryMenu } from './Menu'
import {ShopTwoTone} from '@ant-design/icons'

export const Header = () => {
	const { Search } = Input
	const { Title } = Typography
	return (
		<Affix>
			<div className='container'>
				<Row
					gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
					justify='center'
					align='middle'
				>
					<Col>
						<a><Title level={2}><ShopTwoTone />Bazar</Title></a>
					</Col >

					<Col xs={20} sm={10} md={4} lg={3}>
						<CategoryMenu />
					</Col >
					<Col xs={20} sm={10} md={10} lg={12}>
						<Search
							placeholder="Поиск по объявлениям"
							allowClear
							enterButton
							style={{ margin: '1rem 0' }}
						/>
					</Col>
					<Col>
						<Button
							type="primary"
							href={'/product/create'}
						>Разместить объявление
							</Button>
					</Col>
					<Col>
						<Button
							href='/login'
						>Войти
						</Button>
					</Col>
				</Row>
			</div>
		</Affix>
	)
}
