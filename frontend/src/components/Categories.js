import React, { useState, useEffect} from 'react'
import { Row, Col, } from 'antd';
import { axiosInstance } from '../axios'


export default function Categories() {
	const [categories, setCategories] = useState(null)
	const [subcategories, setSubCategories] = useState(null)


	useEffect(() => {
		axiosInstance
			.get('category-list/')
			.then((res) => {
				setCategories(res.data)
			})
	}, [])

	useEffect(() => {
		axiosInstance
			.get('subcategory-list/')
			.then((res) => {
				setSubCategories(res.data)
			})
	}, [])

	if (!categories || !subcategories)
		return (
			<p>Нет данных</p>
		)

	return (
		<Row justify='start' gutter={5}>
			{categories.map((category, index) => (
				<Col xs={8} xl={6}>
					<a key={index} >
						<h3 style={{ textDecoration: 'underline', marginBottom: '1rem' }}>
							{category.name}
						</h3>
					</a>
					{subcategories.map((subcat, index) => (
						<a key={index} href={`category/${subcat.slug}`}>
							{subcat.parent === category.name ?
								<p style={{ fontSize: '13px' }}>
									{subcat.name}
								</p>
								: <></>}
						</a>
					))}
				</Col>
			))}
		</Row>
	)
}
