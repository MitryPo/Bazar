import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Checkbox, Avatar, Col, Spin, Card, message } from 'antd';
import axiosInstance from './Parts/axios'
import { useHistory } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import InputMask from "react-input-mask";


export default function SignIn() {
	const history = useHistory()
	const initialFormData = Object.freeze({
		phone: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setTimeout(() => setLoading(false), 5)
	}, [])
	const handleOk = () => {
		setLoading({
			loading: true
		})
	}



	const [formData, updateFormData] = useState(initialFormData)
	const handlePhoneChange = (e) => {
		updateFormData({
			...formData,
			phone: e.target.value.trim()
		})
	}
	const handlePasswordChange = (e) => {
		updateFormData({
			...formData,
			password: e.target.value.trim()
		})
	}

	const handleSubmit = () => {
		console.log(formData)

		axiosInstance
			.post('/token/', {
				phone: formData.phone,
				password: formData.password
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access)
				localStorage.setItem('refresh_token', res.data.refresh)
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token')
				history.push('/')
				console.log(res)
				console.log(res.data)
			})
			.catch(err => message.error('Неверный логин или пароль'))
	}

	const { Meta } = Card

	return (
		<div
			className='container'
			style={{ textAlign: 'center' }}
		>
			<Row
				justify='center'
				style={{ marginTop: '10%' }}
			>

				<Col
					style={{ width: 700 }}
				>
					<Card
						style={{
							width: '100%',
							boxShadow: '0 5px 10px rgba(150,170,180,0.8)',
						}}
					>
						<Row

						>

							<Col
								style={{ width: '55%' }}
							>

								<Meta
									avatar={
										<img
											height={`100%`}
											width={`100%`}
											src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
										/>
									}
								/>
							</Col>
							<Col
								style={{ width: '45%' }}
							>
								<Form
									layout='vertical'
									onFinish={handleSubmit}
								>

									<h1
										style={{ paddingBottom: '2rem' }}
									>Вход и регистрация
							</h1>

									<Form.Item
										label="Номер телефона"
										name="phone"
										id='phone'
										onChange={handlePhoneChange}
										rules={[
											{
												required: true,
												message: 'Пожалуйста введите номер телефона',
											},
										]}
									>
										<InputMask
											className='ant-input ant-input-lg'
											mask="+7(999)999-99-99"
											alwaysShowMask={true}
										/>


									</Form.Item>

									<Form.Item
										label="Пароль"
										onChange={handlePasswordChange}
										rules={[
											{
												required: true,
												message: 'Пожалуйста введите пароль',
											},
										]}
									>
										<Input.Password
											prefix={<LockOutlined />}
											size="large"
										/>
										<a
											href=""
											style={{ float: 'right' }}
										>
											Забыли пароль?
        				</a>
									</Form.Item>

									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											// loading={loading}
											onClick={handleOk}
											size='large'
											block
										>Войти
          		</Button>
									</Form.Item>

									<a
										href="/registration"
									>
										Зарегистрироваться
        			</a>

								</Form>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
